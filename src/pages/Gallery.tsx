import { Navigation } from "@/components/Navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Footer } from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <PhotoGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
