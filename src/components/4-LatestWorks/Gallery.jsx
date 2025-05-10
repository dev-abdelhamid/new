import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from './projectsData';
import { useTheme } from '../../Context/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';




const Gallery = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;
  const [activeTab, setActiveTab] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [columns, setColumns] = useState(3);

  // Responsive columns handler
  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setColumns(3);
      setVisibleProjects(6);
    } else if (width >= 768) {
      setColumns(2);
      setVisibleProjects(4);
    } else {
      setColumns(1);
      setVisibleProjects(2);
    }
  }, []);

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [updateColumns]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  console.log(lastPage);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/projects?page=${page}`, { headers: headers, }).then(response => {
      setData(response.data.data);  // Set the response data to state
      setLastPage(response.data.pagination.last_page);
      setLoading(false);  // Set loading to false

    })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });


    axios.get(`${API_BASE_URL}/categories`, { headers: headers, }).then(response => {
      setFilter(response.data.data);  // Set the response data to state
      setLoading(false);  // Set loading to false

    })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });

  }, [page]);  // Run this effect whenever the `language` changes

  const categories = useMemo(() => [
    { id: 'all', label: t('projects.categories.all') },
    { id: 2, label: t('projects.categories.web') },
    { id: 1, label: t('projects.categories.mobile') },
    { id: 3, label: t('projects.categories.design') },
  ], [t]);


  return (
    <>
      {
        loading ? "loading" :
          <div className={`min-h-screen mt-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} font-cairo`}>
            <div className="relative">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('/patterns/grid.svg')]" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-blue-500/20 blur-3xl" />
              </div>

              <div className="container mx-auto px-4 py-20 relative">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-10"
                >
                  <h1 className={`text-4xl md:text-5xl lg:text-5xl font-bold mb-6 
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
            bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text`}
                  >
                    {t('projects.title')}
                  </h1>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '8rem' }}
                    className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"
                  />
                  <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('projects.description')}
                  </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
                >
                  <button

                    onClick={() => {
                      setActiveTab('all');
                      setVisibleProjects(columns === 3 ? 6 : columns === 2 ? 4 : 2);
                    }}
                    className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                ${activeTab === 'all'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                        : `${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} 
                     hover:shadow-md hover:scale-105`
                      }
              `}
                  >
                    {t('projects.categories.all')}
                  </button>
                  {filter.map((singleCategory) => (
                    <button
                      key={singleCategory.id}
                      onClick={() => {
                        setActiveTab(singleCategory.id);
                        setVisibleProjects(columns === 3 ? 6 : columns === 2 ? 4 : 2);
                      }}
                      className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                ${activeTab === singleCategory.id
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                          : `${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} 
                     hover:shadow-md hover:scale-105`
                        }
              `}
                    >
                      {singleCategory.name}
                    </button>
                  ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

                  <AnimatePresence mode="wait">
                    {data.map((project, index) => (
                      activeTab == 'all' || project.categoryId == activeTab ? (
                        <motion.div
                          key={project.titleEn}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <ProjectCard
                            {...project}
                            currentLang={currentLang}
                            isDarkMode={isDarkMode}
                          />
                        </motion.div>
                      )
                        : null
                    ))}
                  </AnimatePresence>
                </div>
                {/* pagination */}
                <div className="pagination flex items-center justify-center mt-8 gap-3 ">
                  {/* array from 1 to lastPage .map */}
                  {
                    [...Array(lastPage)].map((_, index) => (
                      <button onClick={() => {
                        setPage(index + 1);
                      }}
                      disabled={page === index + 1}
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-medium
                      bg-[#2563eb] text-white hover:bg-white hover:text-[#2563eb] transition-all duration-300 ${page === index + 1 ? 'rounded-md opacity-70' : ''}`}
                      >
                        {index + 1}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default Gallery;