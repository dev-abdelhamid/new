import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Quote, Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, isDarkMode = true }) => {
  const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const quoteAnimation = {
    initial: { opacity: 0, rotate: -45 },
    animate: { opacity: 0.6, rotate: 0 },
    hover: { scale: 1.1, opacity: 0.8 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={cardAnimation}
      className={`
        w-full h-[250px] flex flex-col gap-4 justify-between
        rounded-2xl p-6 relative overflow-hidden
        backdrop-blur-lg
        ${isDarkMode 
          ? 'bg-gradient-to-br from-blue-950/90 to-gray-900/90 text-white' 
          : 'bg-white/90 text-gray-800'}
        
        transition-shadow duration-300
      `}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      {/* Quote Icon */}
      <motion.div
        variants={quoteAnimation}
        className="absolute right-4 top-4"
      >
        <Quote 
          size={28} 
          className="text-blue-400"
        />
      </motion.div>

      <div className="relative flex flex-col gap-5">
          {/* header */}
          <div className="flex align-center items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20   rounded-lg object-cover shadow-md"
          />
          
          <div className="text-right">
            <h3 className="text-lg font-bold mb-1">{testimonial.name}</h3>
            <p className="text-sm text-blue-400">{testimonial.jobTitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <p className="text-sm leading-relaxed text-right line-clamp-3">
            {testimonial.comment}
          </p>
        </div>

        {/* Footer */}
        <div className={`
          flex justify-between items-center pt-3
          border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}
        `}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-row-reverse items-center gap-2"
          >
            <Calendar size={16} className="text-blue-400" />
            <span className="text-xs text-gray-400">{testimonial.createdAt}</span>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-row-reverse items-center gap-2"
          >
            <MapPin size={16} className="text-blue-400" />
            <span className="text-xs text-gray-400">{testimonial.country}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  isDarkMode: PropTypes.bool,
  isRTL: PropTypes.bool
};

export default TestimonialCard;