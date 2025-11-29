-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Create photos table
create table public.photos (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  description text,
  storage_path text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.photos enable row level security;

-- Photos policies - allow authenticated users to view all photos (public gallery)
create policy "Anyone can view photos"
  on public.photos for select
  to authenticated
  using (true);

create policy "Users can upload their own photos"
  on public.photos for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own photos"
  on public.photos for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own photos"
  on public.photos for delete
  to authenticated
  using (auth.uid() = user_id);

-- Create storage bucket for photos
insert into storage.buckets (id, name, public)
values ('gallery-photos', 'gallery-photos', true);

-- Storage policies for gallery-photos bucket
create policy "Anyone can view photos"
  on storage.objects for select
  using (bucket_id = 'gallery-photos');

create policy "Authenticated users can upload photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can update their own photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery-photos' and auth.uid()::text = (storage.foldername(name))[1]);

-- Trigger to auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();