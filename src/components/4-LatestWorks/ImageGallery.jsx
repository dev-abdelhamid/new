import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export const ImageGallery = ({ project, isDarkMode }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dragStart, setDragStart] = useState(0);
  const autoPlayInterval = useRef(null);
  const thumbnailsPerPage = isMobile ? 4 : 6;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(project.images.length / thumbnailsPerPage);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayInterval.current = setInterval(nextImage, 3000);
    }
    return () => clearInterval(autoPlayInterval.current);
  }, [isAutoPlaying]);

  const nextImage = useCallback(() => {
    setActiveImage(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
  }, [project.images.length]);

  const prevImage = useCallback(() => {
    setActiveImage(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
  }, [project.images.length]);

  const handleDragStart = (event) => {
    setIsAutoPlaying(false);
    const touchX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    setDragStart(touchX);
  };

  const handleDragEnd = (event) => {
    const touchX = event.type.includes('mouse') ? event.clientX : event.changedTouches[0].clientX;
    const difference = dragStart - touchX;
    const threshold = 50;

    if (Math.abs(difference) > threshold) {
      if (difference > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    setIsAutoPlaying(true);
  };

  

  return (
    <div className="relative space-y-4 max-w-full mx-auto" dir="ltr">
      <div className="relative rounded-xl overflow-hidden shadow-lg group">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          className="w-full h-full"
        >
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={project.images[activeImage]}
            alt={`Screenshot ${activeImage + 1}`}
            className="w-full aspect-video object-cover cursor-grab active:cursor-grabbing"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={prevImage}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transform -translate-x-2 group-hover:translate-x-0 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transform translate-x-2 group-hover:translate-x-0 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: isAutoPlaying ? Infinity : 0 }}
          />
        </div>

        <button
          onClick={() => setIsMaximized(true)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/70 dark:bg-gray-900/70 
            backdrop-blur-sm hover:bg-blue-500 transition-colors"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeImage === index 
                  ? 'bg-blue-500 w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-2 overflow-hidden">
          {project.images
            .slice(
              currentPage * thumbnailsPerPage,
              (currentPage + 1) * thumbnailsPerPage
            )
            .map((screenshot, index) => {
              const actualIndex = currentPage * thumbnailsPerPage + index;
              return (
                <motion.button
                  key={actualIndex}
                  onClick={() => setActiveImage(actualIndex)}
                  className={`flex-1 aspect-video rounded-lg overflow-hidden ${
                    activeImage === actualIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={screenshot}
                    alt={`Thumbnail ${actualIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              );
            })}
        </div>

        {totalPages > 1 && (
          <>
           
          </>
        )}
      </div>

      <AnimatePresence>
        {isMaximized && (
          <MaximizedView
            project={project}
            activeImage={activeImage}
            setIsMaximized={setIsMaximized}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const MaximizedView = ({ project, activeImage, setIsMaximized, nextImage, prevImage }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
  >
    <button
      onClick={() => setIsMaximized(false)}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
    >
      <X className="w-6 h-6 text-white" />
    </button>

    <img
      src={project.images[activeImage]}
      alt={`Screenshot ${activeImage + 1}`}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        onClick={prevImage}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  </motion.div>
);

ImageGallery.propTypes = {
  project: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    titleEn: PropTypes.string.isRequired
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired
};
