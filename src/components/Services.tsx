import { motion } from "framer-motion";
import { Camera, Video, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Camera,
    title: "Event Photography",
    description: "Professional coverage of cultural festivals, corporate events, and special occasions throughout Dominica.",
    features: ["High-resolution images", "Quick turnaround", "Full event coverage"],
  },
  {
    icon: Video,
    title: "Videography",
    description: "Cinematic video production capturing the essence of your events and Dominica's natural beauty.",
    features: ["4K quality", "Professional editing", "Drone footage available"],
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    description: "Individual and group photography sessions in stunning natural locations across the Nature Isle.",
    features: ["Location scouting", "Natural lighting", "Retouching included"],
  },
  {
    icon: Award,
    title: "Commercial Work",
    description: "Professional photography for businesses, tourism, and promotional campaigns showcasing Dominica.",
    features: ["Brand storytelling", "Marketing materials", "Social media content"],
  },
];

export const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-mist">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional photography and videography services capturing the spirit of Dominica and your special moments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3 text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-card-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
