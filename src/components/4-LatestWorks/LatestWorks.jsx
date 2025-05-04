import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import { useNavigate } from 'react-router-dom';

const LatestWorks = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/projects`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setProjects(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  return (
    <section className={`relative w-full py-10 ${currentLang === 'ar' ? 'font-cairo' : 'font-cairo'}`}>
      <div className="relative container mx-auto px-4 mt-2 z-20">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {t('works.title')}
            </h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
            />

            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg max-w-2xl mx-auto`}>
              {t('works.subtitle')}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProjectCard {...project} currentLang={currentLang} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={() => navigate('/Gallery')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 
              text-white rounded-lg transition-all duration-300"
          >
            <span className="text-lg font-medium">{t('works.viewMore')}</span>
            <ExternalLink size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(LatestWorks);
