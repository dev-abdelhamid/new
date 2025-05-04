import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/effect-fade';

const API_BASE_URL = 'https://backend.subcodeco.com/api';

export const AboutSection = () => {
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

  return (
    <motion.section 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-blue-950' 
          : 'bg-gradient-to-b from-white to-blue-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isRTL ? '' : 'lg:flex-row-reverse'
        }`}>
          <motion.div
            className="space-y-8 text-center lg:text-start"
            initial={{ x: isRTL ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
                  isDarkMode ? 'text-cyan-500' : 'text-blue-600'
                } leading-tight`}
                whileHover={{ scale: 1.02 }}
              >
                {data.title || 'Our Story'}
              </motion.h2>
              
              <motion.p
                className={`text-lg sm:text-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {data.description || 'Building innovative solutions for tomorrow'}
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ x: isRTL ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-2xl blur-2xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                  : 'bg-gradient-to-r from-blue-600/20 to-cyan-500/20'
              }`}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false
              }}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="rounded-2xl shadow-2xl"
            >
              {data.sliders?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative aspect-[4/3]">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
