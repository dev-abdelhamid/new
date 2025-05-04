import { memo, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import ServiceCard from './ServiceCard';
import { FiSearch } from 'react-icons/fi';

const AllServices = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: t('services.tabs.all') },
    { id: 'consulting', label: t('services.tabs.consulting') },
    { id: 'development', label: t('services.tabs.development') },
    { id: 'design', label: t('services.tabs.design') },
    { id: 'marketing', label: t('services.tabs.marketing') }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/services`, {
        headers: { 'Accept-Language': i18n.language }
      });
      setServices(data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, [i18n.language]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' ? true : service.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const renderSkeletons = () => (
    [...Array(6)].map((_, index) => (
      <motion.div
        key={`skeleton-${index}`}
        variants={itemVariants}
        className="animate-pulse"
      >
        <div className={`h-[400px] rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="h-48 rounded-t-2xl bg-gray-700" />
          <div className="p-6 space-y-4">
            <div className="h-6 w-3/4 rounded bg-gray-700" />
            <div className="h-4 w-full rounded bg-gray-700" />
            <div className="h-4 w-2/3 rounded bg-gray-700" />
          </div>
        </div>
      </motion.div>
    ))
  );

  return (
    <div className={`min-h-screen font-[cairo] ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gray-50'}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-20 px-4"
      >
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <h1 className={`text-4xl md:text-6xl font-bold drop-shadow-lg mb-5 ${isDarkMode ? 'text-blue-600' : 'text-blue-700'}`}>
            {t('services.allServices')}
          </h1>
          <p className={`text-xl drop-shadow-lg mx-auto mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {t('services.exploreDescription')}
          </p>
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 mb-4">
        <div className={`relative rounded-full  border border-blue-700  shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder={t('services.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-8 pr-5  py-2 md:py-2.5 rounded-full text-lg focus:outline-none ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          />
        </div>
      </div>

      <div className="flex justify-center mb-8 px-5 py-2 overflow-x-auto scrollbar-hide overflow-y-hidden">
        <div className={`inline-flex gap-4 rounded-2xl overflow-hidden p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2  rounded-2xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : `${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + loading}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? renderSkeletons() : (
              filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <ServiceCard
                    service={service}
                    isDarkMode={isDarkMode}
                    isLoading={false}
                  />
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(AllServices);