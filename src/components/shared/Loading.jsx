import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';

export function Loading() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 flex flex-col min-h-screen items-center justify-center">
      <motion.div
        className={`flex flex-col items-center gap-4 p-8 rounded-2xl ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full ${
                isDarkMode 
                  ? 'bg-emerald-500' 
                  : 'bg-emerald-600'
              }`}
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <motion.p
          className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
         {null}
        </motion.p>
      </motion.div>
    </div>
  );
}
