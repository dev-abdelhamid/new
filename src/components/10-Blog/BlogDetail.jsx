import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Share2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import parse from 'html-react-parser';

const BlogDetail = () => {
  const { slug } = useParams();
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/post/${slug}`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setArticle(data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug, i18n.language]);

  if (loading) {
    return <div className="h-screen animate-pulse bg-gray-100 dark:bg-gray-900" />;
  }

  if (!article) return null;

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative h-[60vh]  border-b border-gray-200/30 overflow-hidden">
        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-full  object-fill object-center"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <div className="absolute  inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute   inset-0 ">
          <div className="container   z-10 mx-auto px-4">
            <motion.div 
              className="max-w-6xl mx-auto  bottom-10 absolute  left-0 right-0 text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl  drop-shadow-2xl md:text-5xl font-bold text-white mb-6">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-white/90">
                
                <span className="flex  drop-shadow-2xl items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {article.view} {isRTL ? "مشاهدة" : "views"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl   mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none mx-auto"
          >
            {parse(article.description)}
          </motion.article>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags?.map(tag => (
              <span
                key={tag}
                className={`
                  px-4 py-2 rounded-full text-sm
                  ${isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                  transition-colors duration-300
                `}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;