import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';

export interface HeroContent {
  tagline: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutContent {
  title: string;
  location: string;
  locationTagline: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  notableEvents: string[];
  stats: { label: string; value: string }[];
}

export interface ContactContent {
  phone: string;
  email: string;
  location: string;
  businessHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

export interface ServicesContent {
  title: string;
  description: string;
  items: ServiceItem[];
}

type SectionContent = HeroContent | AboutContent | ContactContent | ServicesContent;

export const useSiteContent = <T extends SectionContent>(sectionKey: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['site-content', sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_key', sectionKey)
        .single();

      if (error) throw error;
      return data?.content as unknown as T;
    },
  });

  const mutation = useMutation({
    mutationFn: async (content: T) => {
      const { error } = await supabase
        .from('site_content')
        .update({ content: content as unknown as Json })
        .eq('section_key', sectionKey);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content', sectionKey] });
      toast.success('Content saved successfully!');
    },
    onError: (error) => {
      console.error('Error saving content:', error);
      toast.error('Failed to save content. Make sure you have admin permissions.');
    },
  });

  return {
    content: query.data,
    isLoading: query.isLoading,
    error: query.error,
    saveContent: mutation.mutate,
    isSaving: mutation.isPending,
  };
};
