-- Create site_content table for CMS-like content management
CREATE TABLE public.site_content (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site content (public website)
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can update site content
CREATE POLICY "Only admins can update site content"
ON public.site_content
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert site content
CREATE POLICY "Only admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert default content for each section
INSERT INTO public.site_content (section_key, content) VALUES
('hero', '{
  "tagline": "Capturing Dominica''s Natural Beauty",
  "title": "EmeraldPics",
  "subtitle": "Photography",
  "description": "Professional event photography and videography services in the heart of the Nature Isle"
}'::jsonb),
('about', '{
  "title": "About EmeraldPics",
  "location": "Fortune, Dominica",
  "locationTagline": "Capturing the Nature Isle",
  "paragraph1": "Established in 2021, EmeraldPics has grown into a recognized photography outfit offering services for events and activities for both private and public entities across Dominica.",
  "paragraph2": "Based in Fortune, Dominica, Jireh Durand serves as the main photographer and videographer, bringing professional expertise and artistic vision to every project. With a deep connection to the Nature Isle, we specialize in capturing the essence of Dominica''s natural beauty and cultural richness.",
  "paragraph3": "We also run a YouTube channel dedicated to promoting the work of local musical artists, contributing to Dominica''s vibrant cultural scene.",
  "notableEvents": ["Golden Drum Awards", "National Schools Arts Festival", "Cadence-Lypso Festival", "District Cultural Festivals", "Portsmouth Carnival", "Independence Activities"],
  "stats": [
    {"label": "Events Covered", "value": "100+"},
    {"label": "Happy Clients", "value": "500+"},
    {"label": "Years Active", "value": "3+"},
    {"label": "5-Star Reviews", "value": "50+"}
  ]
}'::jsonb),
('contact', '{
  "phone": "767 615 4170",
  "email": "steve.vidal@gmail.com",
  "location": "Fortune, Dominica",
  "businessHours": {
    "weekday": "9:00 AM - 6:00 PM",
    "saturday": "10:00 AM - 4:00 PM",
    "sunday": "By Appointment"
  }
}'::jsonb),
('services', '{
  "title": "Our Services",
  "description": "Professional photography and videography services capturing the spirit of Dominica and your special moments",
  "items": [
    {
      "title": "Event Photography",
      "description": "Professional coverage of cultural festivals, corporate events, and special occasions throughout Dominica.",
      "features": ["High-resolution images", "Quick turnaround", "Full event coverage"]
    },
    {
      "title": "Videography",
      "description": "Cinematic video production capturing the essence of your events and Dominica''s natural beauty.",
      "features": ["4K quality", "Professional editing", "Drone footage available"]
    },
    {
      "title": "Portrait Sessions",
      "description": "Individual and group photography sessions in stunning natural locations across the Nature Isle.",
      "features": ["Location scouting", "Natural lighting", "Retouching included"]
    },
    {
      "title": "Commercial Work",
      "description": "Professional photography for businesses, tourism, and promotional campaigns showcasing Dominica.",
      "features": ["Brand storytelling", "Marketing materials", "Social media content"]
    }
  ]
}'::jsonb);