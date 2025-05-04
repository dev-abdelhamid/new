import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';

const translations = {
  future: {
    badge: {
      en: 'Our Future',
      ar: 'مستقبلنا'
    },
    description: {
      en: "Building tomorrow's digital solutions today",
      ar: 'نبني حلول الغد الرقمية اليوم'
    }
  }
};



const VisionSection = () => {
  const { isDarkMode } = useTheme();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend.subcodeco.com/api/about-us', {
          headers: { 'Accept-Language': currentLang }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLang]);

  if (loading || !data) return null;

  const sections = [
    {
      id: 'vision',
      title: { en: 'Our Vision', ar: 'رؤيتنا' },
      image: data.visionImage || '',
      description: data.vision || '',
      points: data.visionWords ? 
        (typeof data.visionWords === 'string' ? 
          JSON.parse(data.visionWords || '[]') : 
          data.visionWords) : []
    },
    {
      id: 'message',
      title: { en: 'Our Message', ar: 'رسالتنا' },
      image: data.messageImage || '',
      description: data.message || '',
      points: data.messageWords ? 
        (typeof data.messageWords === 'string' ? 
          JSON.parse(data.messageWords || '[]') : 
          data.messageWords) : []
    },
    {
      id: 'goals',
      title: { en: 'Our Goals', ar: 'أهدافنا' },
      image: data.goalsImage || '',
      description: data.goals || '',
      points: data.goalsWords ? 
        (typeof data.goalsWords === 'string' ? 
          JSON.parse(data.goalsWords || '[]') : 
          data.goalsWords) : []
    },
    {
      id: 'values',
      title: { en: 'Our Values', ar: 'قيمنا' },
      image: data.valueImage || '',
      description: data.value || '',
      points: data.valueWords ? 
        (typeof data.valueWords === 'string' ? 
          JSON.parse(data.valueWords || '[]') : 
          data.valueWords) : []
    },
    {
      id: 'partners',
      title: { en: 'Our Partners', ar: 'شركاؤنا' },
      image: data.partenerImage || '',
      description: data.partener || '',
      points: data.partenerWords ? 
        (typeof data.partenerWords === 'string' ? 
          JSON.parse(data.partenerWords || '[]') : 
          data.partenerWords) : []
    }
  ];

  return (
    <section className={`min-h-screen py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white via-blue-50 to-white'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div className="text-center mb-16 relative">
          <span className={`inline-block px-4 mt-4 py-1.5 rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800'} text-sm font-medium mb-4`}>
            {translations.future.badge[currentLang]}
          </span>
          <p className={`max-w-2xl mx-auto text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {translations.future.description[currentLang]}
          </p>
        </motion.div>

        <div className="space-y-40">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            >
              <div className={`absolute -z-10 inset-0 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-blue-900/10 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-50/50 to-transparent'} blur-2xl`} />

              <div className="w-full md:w-2/5 relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-blue-900/30 to-gray-900/40' : 'bg-gradient-to-br from-blue-100/80 to-white/40'} rounded-3xl transform rotate-3`} />
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-tl from-blue-900/30 to-gray-900/40' : 'bg-gradient-to-tl from-blue-100/80 to-white/40'} rounded-3xl transform -rotate-3`} />
                  <motion.div 
                    className="relative h-full rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={section.image} alt={section.title[currentLang]} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                </div>
              </div>

              <div className="w-full md:w-3/5">
                <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center md:text-start"
                  >
                    <h3 className={`text-4xl font-bold ${isDarkMode ? 'text-blue-400' : 'bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent'} mb-4`}>
                      {section.title[currentLang]}
                    </h3>
                    {section.description && (
                      <div 
                        className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        dangerouslySetInnerHTML={{ __html: section.description }}
                      />
                    )}
                  </motion.div>

                  {section.points?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {section.points.map((point, idx) => (
                        <motion.div
                          key={idx}
                          className="group"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`relative p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-white hover:shadow-md'} rounded-xl transition-all duration-300`}>
                            <div className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                {point}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
