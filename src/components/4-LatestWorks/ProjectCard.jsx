import { Eye } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-[240px] bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
    <div className="p-6">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mx-auto" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mx-auto" />
      </div>
    </div>
  </div>
);

const ProjectCard = ({ 
  title, 
  slug,
  name, 
  thumbnail, 
  tools, 
  currentLang 
}) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isArabic = currentLang === 'ar';

  const handleCardClick = () => {
    navigate(`/project/${slug}`);
  };

  useEffect(() => {
    const img = new Image();
    img.src = thumbnail;
    img.onload = () => setImageLoaded(true);
    return () => {
      img.onload = null;
    };
  }, [thumbnail]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const toolsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.article 
      onClick={handleCardClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative h-[480px] w-full
        rounded-2xl overflow-hidden
        ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'}
        backdrop-blur-sm
        shadow-lg hover:shadow-2xl
        transition-all duration-500
        border-2 cursor-pointer
        ${isHovered 
          ? isDarkMode 
            ? 'border-blue-500/50 shadow-blue-500/20' 
            : 'border-blue-400/50 shadow-blue-400/20'
          : isDarkMode 
            ? 'border-white/10' 
            : 'border-gray-200'
        }
      `}
    >
      <AnimatePresence>
        {!imageLoaded && <LoadingSkeleton />}
      </AnimatePresence>

      <div className="relative h-[240px] w-full overflow-hidden">
        <motion.img
          variants={imageVariants}
          src={thumbnail}
          alt={title}
          className={`
            object-cover w-full h-full
            transition-opacity duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        />

        <motion.div 
          variants={toolsVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          className="absolute bottom-4 left-0 right-0 px-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {tools.map((tool, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className={`
                  px-4 py-1.5 rounded-full
                  text-sm font-medium
                  backdrop-blur-md border
                  transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-black/50 text-blue-300 border-blue-500/30'
                    : 'bg-white/50 text-blue-600 border-blue-200'
                  }
                `}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-6 flex flex-col h-[240px] text-center">
        <motion.h3 
          className={`
            text-2xl font-bold mb-4
            ${isHovered ? 'text-blue-500' : ''}
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
            transition-colors duration-300
          `}
        >
          {title}
        </motion.h3>
        
        <p className={`
          mb-6 line-clamp-3 text-base mx-auto max-w-[90%]
          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {name}
        </p>

        <div className="mt-auto flex justify-center">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              group
              inline-flex items-center gap-2
              px-6 py-2.5 rounded-xl
              font-medium text-white
              transition-all duration-300
              bg-gradient-to-r from-blue-500 to-blue-600
              hover:from-blue-600 hover:to-blue-700
              shadow-lg hover:shadow-blue-500/25
              z-10
            `}
          >
            <span className="text-base">
              {isArabic ? "عرض التفاصيل" : "View Details"}
            </span>
            <Eye 
              size={20} 
              className={`transition-transform duration-300 
                ${isArabic 
                  ? 'group-hover:-translate-x-1' 
                  : 'group-hover:translate-x-1'
                }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  tools: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentLang: PropTypes.string.isRequired
};

export default ProjectCard;
