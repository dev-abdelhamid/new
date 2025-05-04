import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import CornerLights from '../0-Background/CornerLights';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import ServiceCard from './ServiceCard';
import { animations } from './animations';

const Services = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [services, setServices] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
    setDisplayCount(width >= 1024 ? 6 : 4);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/services`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setServices(data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [i18n.language]);

  const loadMore = () => {
    const increment = windowWidth >= 1024 ? 3 : 4;
    setDisplayCount(prev => prev + increment);
  };

  const showLoadMore = displayCount < services.length && displayCount < (windowWidth >= 1024 ? 9 : 8);

  return (
    <section className={`relative w-full py-10 ${i18n.language === 'ar' ? 'font-cairo' : 'font-cairo'}`}>
      <div className="absolute inset-0 opacity-50">
        <CornerLights />
      </div>

      <div className="relative container mx-auto px-4 mt-2 z-20" id="services">
        <AnimatePresence>
          <motion.div {...animations.fadeInUp} className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('services.title')}
            </h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
            />

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
              {t('services.subtitle')}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, displayCount).map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        <motion.div {...animations.fadeInUp} className="mt-12 text-center">
          {showLoadMore ? (
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-6 py-3 
                bg-blue-700 
                text-white rounded-xl font-medium
                transition-all duration-300 hover:scale-105 
                hover:shadow-lg hover:from-blue-600 hover:to-blue-800 
                active:scale-95 transform hover:-translate-y-1"
            >
              {t('services.loadMore')}
              <ExternalLink size={18} className="transition-transform cursor-pointer group-hover:rotate-45" />
            </button>
          ) : (
            <Link
              to="/all-services"
              className="inline-flex items-center cursor-pointer gap-2 px-6 py-3 
                bg-blue-700 
                text-white rounded-xl font-medium
                transition-all duration-300 hover:scale-105 
                hover:shadow-lg hover:from-blue-600 hover:to-blue-800 
                active:scale-95 transform hover:-translate-y-1"
            >
              {t('services.viewAllServices')}
              <ExternalLink size={18} className="transition-transform group-hover:rotate-45" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(Services);