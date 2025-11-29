-- Enable realtime for photos table
ALTER TABLE public.photos REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.photos;