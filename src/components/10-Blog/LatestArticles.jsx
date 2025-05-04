import { motion } from 'framer-motion';
import {  ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import ArticleCard from './ArticleCard';

const LatestArticles = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/posts`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setArticles(data.data.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [i18n.language]);

  return (
    <section className={`py-12 md:py-16 relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className={`w-full h-full ${isDarkMode ? 'bg-grid-dark' : 'bg-grid-light'}`} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('latestArticles.title')}
          </h2>
          <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
                />
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('latestArticles.description')}
          </p>
        </motion.header>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12"
          >
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-[420px] rounded-xl animate-pulse bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" 
                />
              ))
            ) : (
              articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ArticleCard {...article} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 px-6 py-2.5 md:py-3 rounded-lg
              text-white font-medium
              bg-blue-600 
              shadow-md hover:shadow-lg hover:shadow-blue-500/20 
              transform hover:scale-105
              transition-all duration-300"
          >
            <span>{t('latestArticles.viewAll')}</span>
            <ExternalLink className={`w-4 h-4 transition-transform duration-300
            `} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;