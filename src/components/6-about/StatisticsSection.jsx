import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';

const API_BASE_URL = 'https://backend.subcodeco.com/api';

const statisticsText = {
  en: [
    'Happy Clients',
    'Completed Projects',
    'Years Experience',
    'Team Members',
    'Active Projects',
    'Awards Won'
  ],
  ar: [
    'عميل سعيد',
    'مشروع مكتمل',
    'سنوات خبرة',
    'عضو فريق',
    'مشروع نشط',
    'جائزة محققة'
  ]
};

export const StatisticsSection = () => {
  const { isDarkMode } = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/about-us`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  if (loading || !data) return null;

  const displayItems = data.items.slice(0, 6);

  return (
    <motion.section 
      className={`py-16 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-900 to-blue-800'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {displayItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className={`absolute inset-0 rounded-2xl ${
                  isDarkMode ? 'bg-blue-500/10' : 'bg-blue-400/20'
                } blur-xl transition-all duration-300 group-hover:blur-2xl`}
                whileHover={{ scale: 1.1 }}
              />
              
              <motion.div 
                className="relative p-6 flex flex-col items-center justify-center h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-4xl md:text-5xl font-bold mb-3 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-300'
                }`}>
                  <CountUp
                    end={parseInt(item.number.replace(/\D/g, ''))}
                    duration={2.5}
                    separator=","
                    suffix="+"
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>

                <div className={`text-sm md:text-base font-medium text-center ${
                  isDarkMode ? 'text-gray-300' : 'text-blue-100'
                }`}>
                  {isRTL ? statisticsText.ar[index] : statisticsText.en[index]}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatisticsSection;
