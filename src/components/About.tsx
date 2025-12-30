import { motion } from "framer-motion";
import { Award, MapPin, Users, Heart } from "lucide-react";
import rainforestImg from "@/assets/rainforest.jpg";
import { useSiteContent, AboutContent } from "@/hooks/useSiteContent";

const iconMap = {
  "Events Covered": Award,
  "Happy Clients": Users,
  "Years Active": MapPin,
  "5-Star Reviews": Heart,
};

export const About = () => {
  const { content, isLoading } = useSiteContent<AboutContent>('about');

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="animate-pulse text-center">Loading...</div>
        </div>
      </section>
    );
  }

  const stats = content?.stats || [];
  const notableEvents = content?.notableEvents || [];

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
                <p className="text-sm font-medium mb-2">Based in {content?.location || 'Dominica'}</p>
                <h3 className="font-serif text-3xl font-bold">
                  {content?.locationTagline || 'Capturing the Nature Isle'}
                </h3>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="absolute -bottom-8 -right-8 grid grid-cols-2 gap-4 bg-card p-6 rounded-xl shadow-xl border border-border">
              {stats.map((stat) => {
                const IconComponent = iconMap[stat.label as keyof typeof iconMap] || Award;
                return (
                  <div key={stat.label} className="text-center">
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
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
              {content?.title || 'About EmeraldPics'}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>{content?.paragraph1}</p>
              <p>{content?.paragraph2}</p>
              <p>{content?.paragraph3}</p>
            </div>

            <div className="bg-mist p-6 rounded-xl mb-8">
              <h3 className="font-serif text-xl font-bold mb-4 text-foreground">
                Notable Events Coverage
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {notableEvents.map((event) => (
                  <div key={event} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-sm text-foreground">{event}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{content?.location || 'Dominica'} • Serving all of the Nature Isle</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
