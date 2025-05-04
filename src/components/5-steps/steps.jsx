import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import CornerLights from '../0-Background/CornerLights';
import { Lightbulb, BarChart, Palette, Layout, Code2, TestTube, Rocket, HeartHandshake } from 'lucide-react';

const useSteps = () => {
  const { t } = useTranslation();
  return [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      number: t('steps.step1.number'),
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      color: 'bg-gradient-to-r from-cyan-400 to-blue-500'
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      number: t('steps.step2.number'),
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      color: 'bg-gradient-to-r from-blue-500 to-indigo-500'
    },
    {
      icon: <Palette className="h-6 w-6" />,
      number: t('steps.step3.number'),
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      color: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    },
    {
      icon: <Layout className="h-6 w-6" />,
      number: t('steps.step4.number'),
      title: t('steps.step4.title'),
      description: t('steps.step4.description'),
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      number: t('steps.step5.number'),
      title: t('steps.step5.title'),
      description: t('steps.step5.description'),
      color: 'bg-gradient-to-r from-pink-500 to-rose-500'
    },
    {
      icon: <TestTube className="h-6 w-6" />,
      number: t('steps.step6.number'),
      title: t('steps.step6.title'),
      description: t('steps.step6.description'),
      color: 'bg-gradient-to-r from-rose-500 to-red-500'
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      number: t('steps.step7.number'),
      title: t('steps.step7.title'),
      description: t('steps.step7.description'),
      color: 'bg-gradient-to-r from-red-500 to-orange-500'
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      number: t('steps.step8.number'),
      title: t('steps.step8.title'),
      description: t('steps.step8.description'),
      color: 'bg-gradient-to-r from-orange-500 to-yellow-500'
    }
  ];
};

export default function Steps() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const steps = useSteps();

  return (
    <section className={`py-8 px-4 sm:px-6 font-cairo lg:px-8 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-50 w-full h-full" style={{ contain: 'layout paint size', willChange: 'transform' }}>
        <CornerLights />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {t('steps.title')}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('steps.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 300, damping: 30 }}
              viewport={{ once: true }}
              className="relative group flex flex-col"
            >
              <motion.div
                className={`bg-gradient-to-br from-emerald-500/20 via-emerald-400/20 to-yellow-400/20 bg-white rounded-xl shadow-md p-6 sm:p-4 border ${isDarkMode ? 'border-blue-500' : 'border-white'} group-hover:border-2 group-hover:border-blue-200 group-hover:shadow-xl`}
                style={{ height: '130px', width: '100%' }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <div
                  className={`absolute -top-6 ${t('direction') === 'rtl' ? 'right-6' : 'left-6'} w-14 h-14 ${step.color} rounded-full flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300`}
                >
                  {step.icon}
                </div>
                <div
                  className={`absolute font-tajawal -top-6 ${t('direction') === 'rtl' ? 'left-6' : 'right-6'} w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md`}
                >
                  {step.number}
                </div>
                <div className="mt-3 text-center">
                  <h3 className={`text-xl sm:text-xl font-bold ${isDarkMode ? 'text-black' : 'text-gray-900'} mb-2 group-hover:text-gray-800 transition-colors`}>
                    {step.title}
                  </h3>
                  <p className={`sm:text-base ${isDarkMode ? 'text-gray-600' : 'text-gray-600'} group-hover:text-gray-700 transition-colors`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
