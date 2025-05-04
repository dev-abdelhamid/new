import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import ArticleCard from './ArticleCard';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

const BlogPage = () => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const itemPerPage = 9;
  const isRTL = i18n.language === 'ar';

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/posts`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setBlogs(data.data);
        setFilteredBlogs(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [i18n.language]);

  // Filter blogs based on search and tags
  useEffect(() => {
    let filtered = blogs;
    
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(blog =>
        selectedTags.some(tag => blog.tags.includes(tag))
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedTags, blogs]);

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Pagination
  const pageCount = Math.ceil(filteredBlogs.length / itemPerPage);
  const displayData = filteredBlogs.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  return (
    <div className={`min-h-screen mx-auto relative flex flex-col justify-between align-center w-full ${isDarkMode ? 'text-white' : 'text-gray-900'} ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative h-[400px] shadow-blue-700/20 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-80" />
        <img 
          src="/vision.jpeg" 
          alt="Blog Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {i18n.language === 'ar' ? 'مدونتنا' : 'Our Blog'}
            </h1>
            <p className="max-w-4xl mx-auto text-lg">
              {i18n.language === 'ar' 
                ? 'استكشف أحدث المقالات والأفكار في عالم التكنولوجيا والتطوير'
                : 'Explore our latest articles and insights in technology and development'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="  mx-auto px-8 mb-10 mt-4 ">
        <div className="lg:grid lg:grid-cols-3 ">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8 mb-8 lg:mb-0">
            {/* Search */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow`}>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={i18n.language === 'ar' ? 'ابحث في المدونة...' : 'Search blog...'}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Tags */}
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {i18n.language === 'ar' ? 'الوسوم' : 'Tags'}
                </h3>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={() => setSelectedTags([])}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {i18n.language === 'ar' ? 'مسح الكل' : 'Clear All'}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {Array.from(new Set(blogs.flatMap(blog => blog.tags))).map((tag, index) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="lg:col-span-2 mx-auto max-w-7xl">
            <div className="grid  grid-cols-1 md:grid-cols-2  gap-20">
              {isLoading ? (
                // Add loading skeleton here
                Array(6).fill(null).map((_, index) => (
                  <div key={index} className="animate-pulse bg-gray-200 h-64 rounded-lg" />
                ))
              ) : (
                displayData.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    {...article}
                    index={index}
                    currentLang={i18n.language}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex items-center justify-center mt-10 gap-2">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;