import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

export function Logo() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [logoData, setLogoData] = useState({
    loading: true,
    image: null
  });

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/header`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setLogoData({
          loading: false,
          image: response.data.data?.logo
        });
      } catch (error) {
        console.error('Logo fetch error:', error);
        setLogoData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchLogo();
  }, [i18n.language]);

  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: isArabic ? 30 : -30,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.01,
      filter: isDarkMode ? 'brightness(1.2) drop-shadow(4px 3px 4px rgba(221, 229, 255, 0.7))' : 'drop-shadow(1px 3px 2px rgb(24, 38, 105))',
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const loadingVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.98, 1.01, 0.98],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div onClick={handleLogoClick} className="outline-none">
      <motion.div 
        className="relative w-full max-w-[300px] h-[80px] flex items-center justify-center cursor-pointer"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {logoData.loading ? (
          <motion.div
            className={`h-32 w-auto object-contain`}
            variants={loadingVariants}
            animate="animate"
          />
        ) : (
          <motion.img
            src={logoData.image}
            alt="Logo"
            className="h-32 w-auto object-contain "
            variants={imageVariants}
            style={{
              filter: isDarkMode ? 'brightness(1.2) drop-shadow(4px 3px 4px rgba(221, 229, 255, 0.7))' : 'drop-shadow(1px 3px 2px rgb(24, 38, 105))'
            }}
          />
        )}

      
      </motion.div>
    </div>
  );
}
