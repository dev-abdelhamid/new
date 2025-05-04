import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Tag } from 'lucide-react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ service, isDarkMode, isLoading }) => {
  const { t, i18n } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isRTL = i18n.dir() === 'rtl';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 200 }
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className={`
          h-[460px] rounded-2xl overflow-hidden
          ${isDarkMode ? 'bg-gray-800/80' : 'bg-white'}
          shadow-lg hover:shadow-xl transition-shadow duration-300
          border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}
        `}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-[220px] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
          <div className="p-6 space-y-4">
            <div className="h-8 w-3/4 mx-auto rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 rounded-md bg-gray-200 dark:bg-gray-700 w-[85%] mx-auto" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="group"
    >
      <div className={`
        h-[480px] rounded-2xl   shadow-blue-700/20   hover:shadow-blue-700/60 overflow-hidden
        ${isDarkMode ? 'bg-gray-800/90' : 'bg-white'}
        shadow-xl hover:shadow-2xl
        transition-all duration-500
        border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-100'}
       
      `}>
        {/* Image Section */}
        <div className="relative h-[250px] overflow-hidden">
          <motion.img
            src={service.image}
            alt={service.title}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-transform duration-700
              ${imageLoaded ? 'scale-100' : 'scale-105'}
              group-hover:scale-110
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className={`
            absolute top-4 ${isRTL ? 'right-4' : 'left-4'}
            px-3 py-1.5 rounded-full
            bg-blue-600/80 text-white
            backdrop-blur-sm
            flex items-center gap-2
            transform -translate-y-12 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500
          `}>
            <Tag size={16} />
            <span className="text-sm font-medium">{service.category}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-between h-[170px]">
          <div className="space-y-2">
            <Link to={`/services/${service.slug}`}>
              <h3 className={`
                text-2xl font-bold w-full text-center
                ${isDarkMode 
                  ? 'text-blue-600 drop-shadow-md  hover:text-blue-400' 
                  : 'text-blue-700 drop-shadow-md hover:text-blue-600'}
                transition-colors duration-300
                line-clamp-1
              `}>
                {service.title}
              </h3>
            </Link>

            <div className={`
              ${isDarkMode ? 'text-white' : 'text-black'}
              text-md text-center line-clamp-3 
            `}>
              {parse(service.description || '')}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-3 lg:mt-6 ">
            <Link to={`/services/${service.slug}`} className="block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                 mx-auto px-6 py-2 md:py-2.5 rounded-xl
                  bg-gradient-to-r from-blue-600 to-blue-700
                  hover:from-blue-700 hover:to-blue-800
                  text-white font-medium
                  flex items-center justify-center gap-2
                  transition-all duration-300 
                  shadow-lg hover:shadow-blue-500/50
                  ${isRTL ? 'flex-row-reverse' : ''}
                `}
              ><ExternalLink size={18} />
                {t('services.viewDetails')}
                
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
  }),
  isDarkMode: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default memo(ServiceCard);