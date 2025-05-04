import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import PropTypes from 'prop-types';

const skeletonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const CardSkeleton = memo(({ count = 1 }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div 
          key={index}
          variants={skeletonVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: index * 0.1 }}
          className={`
            relative p-4 sm:p-6 rounded-2xl border
            ${isDarkMode ? 'border-blue-800/30 bg-gray-900/50' : 'border-blue-100/80 bg-white/50'}
            w-full h-[400px] sm:h-[450px]
            overflow-hidden
          `}
        >
          <div className="relative z-10 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative mb-4 overflow-hidden rounded-xl">
              <div className="relative aspect-[16/9]">
                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
              </div>
              
              {/* Category and Share Button */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <div className="w-24 h-6 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-3">
                <div className="w-20 h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                <div className="w-20 h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
              </div>
              <div className="w-16 h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
            </div>

            {/* Title */}
            <div className="space-y-2 mb-3">
              <div className="h-5 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse w-[85%]" />
              <div className="h-5 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse w-[65%]" />
            </div>

            {/* Excerpt */}
            <div className="space-y-2 flex-grow">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
                  style={{ width: `${100 - (i * 10)}%` }}
                />
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-14 h-5 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
                />
              ))}
            </div>

            {/* Read More Button */}
            <div className="flex justify-center">
              <div className="w-28 h-7 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
});

CardSkeleton.propTypes = {
  count: PropTypes.number
};

CardSkeleton.displayName = 'CardSkeleton';

export default CardSkeleton;
