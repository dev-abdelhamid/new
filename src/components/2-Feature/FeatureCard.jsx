import { motion, useReducedMotion } from 'framer-motion';
import { memo, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

function FeatureCard({ feature, index, isDarkMode, isInView }) {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    hover: prefersReducedMotion ? {} : { y: -5 }
  }), [prefersReducedMotion]);

  const cardClasses = useMemo(() => `
    group relative text-center overflow-hidden rounded-2xl p-6 
    ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}
    transition-all duration-200
    transform-gpu
  `, [isDarkMode]);

  const innerClasses = useMemo(() => `
    absolute inset-[3px] rounded-xl
    ${isDarkMode ? 'bg-gray-900/95' : 'bg-gray-50/95'}
  `, [isDarkMode]);

  const titleClasses = useMemo(() => `
    text-xl font-semibold mb-4 cairo
    ${isDarkMode ? 'text-white' : 'text-gray-900'}
  `, [isDarkMode]);

  const descriptionClasses = useMemo(() => `
    cairo leading-relaxed
    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
  `, [isDarkMode]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={cardClasses}
    >
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r ${feature.gradient}
            ${isInView && !prefersReducedMotion ? 'animate-border-rotate' : ''}
          `} 
        />
      </motion.div>
      
      <div className={innerClasses} />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
          className={`
            w-16 h-16 rounded-xl mb-6
            flex items-center justify-center
            bg-gradient-to-tr ${feature.gradient}
            transform-gpu
          `}
        >
          <feature.icon className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className={titleClasses}>
          {feature.title}
        </h3>

        <p className={descriptionClasses}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}


FeatureCard.propTypes = {
    feature: PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      gradient: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    isDarkMode: PropTypes.bool.isRequired,
    isInView: PropTypes.bool.isRequired
  };
  
  
  
FeatureCard.displayName = 'FeatureCard';

export default memo(FeatureCard);
