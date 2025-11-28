import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Play, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface Photo {
  id: string;
  url: string;
  name: string;
}

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: Photo[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    
    setPhotos((prev) => [...prev, ...newPhotos]);
    toast.success(`${acceptedFiles.length} photo${acceptedFiles.length > 1 ? 's' : ''} uploaded successfully!`);
    setShowUpload(false); // Hide upload area after successful upload
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    multiple: true,
  });

  const togglePhotoSelection = (id: string) => {
    setSelectedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    setSelectedPhotos((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    toast.success("Photo removed");
  };

  const startSlideshow = () => {
    if (selectedPhotos.size === 0) {
      toast.error("Please select at least one photo for the slideshow");
      return;
    }
    setIsSlideshow(true);
    setCurrentSlideIndex(0);
  };

  const selectedPhotosList = photos.filter((photo) => selectedPhotos.has(photo.id));

  return (
    <div className="py-24 bg-gradient-to-b from-mist to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Photo Gallery
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Upload your photos in batches and create stunning slideshows
              </p>
            </div>
            <Button
              variant="link"
              onClick={() => setShowUpload(!showUpload)}
              className="text-primary hover:text-primary/80"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photos
            </Button>
          </div>

          {/* Upload Area - Toggleable */}
          <AnimatePresence>
            {showUpload && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-8 border-2 border-dashed border-border hover:border-primary transition-colors">
                  <div
                    {...getRootProps()}
                    className={`p-12 text-center cursor-pointer transition-colors ${
                      isDragActive ? "bg-primary/5" : "bg-card"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-semibold text-card-foreground mb-2">
                      {isDragActive ? "Drop photos here" : "Drag & drop photos here"}
                    </p>
                    <p className="text-muted-foreground mb-4">or click to browse</p>
                    <Button variant="outline" type="button">
                      Select Photos
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Gallery Controls */}
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <div className="text-sm text-muted-foreground">
              {photos.length} photo{photos.length !== 1 && "s"} • {selectedPhotos.size} selected
            </div>
            <div className="flex gap-4">
              <Button
                onClick={startSlideshow}
                disabled={selectedPhotos.size === 0}
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Slideshow ({selectedPhotos.size})
              </Button>
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group aspect-square"
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => togglePhotoSelection(photo.id)}
                    className="bg-white/90 hover:bg-white"
                  >
                    {selectedPhotos.has(photo.id) ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Check className="w-4 h-4 opacity-0" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePhoto(photo.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {selectedPhotos.has(photo.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Slideshow Modal */}
        <AnimatePresence>
          {isSlideshow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={() => setIsSlideshow(false)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setIsSlideshow(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <motion.img
                  key={currentSlideIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  src={selectedPhotosList[currentSlideIndex]?.url}
                  alt="Slideshow"
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlideIndex((prev) =>
                      prev === selectedPhotosList.length - 1 ? 0 : prev + 1
                    );
                  }}
                />
              </div>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
                {currentSlideIndex + 1} / {selectedPhotosList.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
