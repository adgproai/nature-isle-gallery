import { Navigation } from "@/components/Navigation";
import { Services as ServicesSection } from "@/components/Services";
import { Footer } from "@/components/Footer";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
