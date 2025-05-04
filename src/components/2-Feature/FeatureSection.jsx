import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { ThumbsUp, Zap, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { memo, useRef, useMemo } from 'react';
import FeatureCard from './FeatureCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const FeatureSection = memo(function FeatureSection() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    margin: "-5%",
    amount: 0.1
  });

  // Memoized data
  const features = useMemo(() => [
    {
      icon: ThumbsUp,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
      gradient: 'from-indigo-500 to-blue-400'
    },
    {
      icon: Zap,
      title: t('features.speed.title'), 
      description: t('features.speed.description'),
      gradient: 'from-indigo-500 via-blue-400 to-indigo-500'
    },
    {
      icon: ShieldCheck,
      title: t('features.security.title'),
      description: t('features.security.description'),
      gradient: 'from-indigo-500 via-blue-400 to-indigo-500'
    }
  ], [t]);

  // Memoized styles
  const styles = useMemo(() => ({
    section: `relative overflow-hidden mx-auto py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`,
    title: `text-3xl md:text-3xl font-bold mb-3 md:mb-4 cairo ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
    underline: `h-1 bg-gradient-to-r md:mt-5 sm:mt-6 ${isDarkMode ? 'from-sky-500 via-blue-500 to-sky-500' : 'from-blue-500 to-blue-500'} mx-auto rounded-full mb-5 md:mb-4 lg:mb-5`
  }), [isDarkMode]);

  return (
    <section ref={sectionRef} id="features" className={styles.section}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 xs:mb-4 md:mb-6 lg:mb-8"
        >
          <h2 className={styles.title}>{t('features.mainTitle')}</h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-2"
          />
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-8xl mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isDarkMode={isDarkMode}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
});

export default FeatureSection;
