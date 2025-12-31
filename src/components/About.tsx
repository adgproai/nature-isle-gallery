import { motion } from "framer-motion";
import { Award, MapPin, Users, Heart, Loader2 } from "lucide-react";
import rainforestImg from "@/assets/rainforest.jpg";
import { useSiteContent, AboutContent } from "@/hooks/useSiteContent";

// Default fallback content (original hardcoded values)
const defaultContent: AboutContent = {
  title: "About EmeraldPics",
  location: "Fortune, Dominica",
  locationTagline: "Capturing the Nature Isle",
  paragraph1: "Established in 2021, EmeraldPics has grown into a recognized photography outfit offering services for events and activities for both private and public entities across Dominica.",
  paragraph2: "Based in Fortune, Dominica, Jireh Durand serves as the main photographer and videographer, bringing professional expertise and artistic vision to every project. With a deep connection to the Nature Isle, we specialize in capturing the essence of Dominica's natural beauty and cultural richness.",
  paragraph3: "We also run a YouTube channel dedicated to promoting the work of local musical artists, contributing to Dominica's vibrant cultural scene.",
  notableEvents: [
    "Golden Drum Awards",
    "National Schools Arts Festival",
    "Cadence-Lypso Festival",
    "District Cultural Festivals",
    "Portsmouth Carnival",
    "Independence Activities",
  ],
  stats: [
    { label: "Events Covered", value: "100+" },
    { label: "Happy Clients", value: "500+" },
    { label: "Years Active", value: "3+" },
    { label: "5-Star Reviews", value: "50+" },
  ],
};

const iconMap = [Award, Users, MapPin, Heart];

export const About = () => {
  const { content, isLoading } = useSiteContent<AboutContent>('about');
  
  // Use database content if available, otherwise fall back to defaults
  const displayContent = content ?? defaultContent;

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={rainforestImg}
                alt="Dominica's lush rainforest"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium mb-2">Based in {displayContent.location}</p>
                <h3 className="font-serif text-3xl font-bold">
                  {displayContent.locationTagline}
                </h3>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="absolute -bottom-8 -right-8 grid grid-cols-2 gap-4 bg-card p-6 rounded-xl shadow-xl border border-border">
              {displayContent.stats.map((stat, index) => {
                const Icon = iconMap[index] || Award;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-serif text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {displayContent.title}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>{displayContent.paragraph1}</p>
              <p>{displayContent.paragraph2}</p>
              <p>{displayContent.paragraph3}</p>
            </div>

            <div className="bg-mist p-6 rounded-xl mb-8">
              <h3 className="font-serif text-xl font-bold mb-4 text-foreground">
                Notable Events Coverage
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {displayContent.notableEvents.map((event) => (
                  <div key={event} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-sm text-foreground">{event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{displayContent.location} • Serving all of the Nature Isle</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
