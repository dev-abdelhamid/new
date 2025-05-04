import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ServicesSkeleton = memo(({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative overflow-hidden rounded-xl"
      >
        <div className="animate-pulse">
          <div className="h-[240px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-t-xl" />
          <div className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-b-xl">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-full w-3/4 mx-auto mb-6" />
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-full mx-auto"
                  style={{ width: `${90 - (i * 15)}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </motion.div>
    ))}
  </div>
));

ServicesSkeleton.propTypes = {
  count: PropTypes.number
};

ServicesSkeleton.displayName = 'ServicesSkeleton';
export default ServicesSkeleton;
