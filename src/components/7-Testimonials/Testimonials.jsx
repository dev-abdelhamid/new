import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';
import { testimonialsData } from './testimonialsdata';
import TestimonialCard from './TestimonialCard';
import CornerLights from '../0-Background/CornerLights';
import axios from 'axios';
// import { API_BASE_URL } from '../../../src/apiConfig';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { API_BASE_URL } from '../../../src/apiConfig';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
};

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const dragX = useMotionValue(0);
  const isRTL = i18n.dir() === 'rtl';

  const [state, setState] = useState({
    currentIndex: 0,
    direction: 1,
    itemsPerView: typeof window !== 'undefined' ? (window.innerWidth < 640 ? 1 : 2) : 2,
    isAnimating: false
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios

    axios.get(`${API_BASE_URL}/testsmoinal`).then(response => {
      setData(response.data.data);  // Set the response data to state
      setLoading(false);  // Set loading to false

    })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });

  }, []);  // Run this effect whenever the `language` changes
  const totalPages = Math.ceil(testimonialsData.length / state.itemsPerView);

  const getCurrentTestimonials = useCallback(() => {
    const startIndex = state.currentIndex * state.itemsPerView;
    return testimonialsData
      .slice(startIndex, startIndex + state.itemsPerView)
      .map(item => ({
        ...item,
        name: item.name[i18n.language],
        role: item.role[i18n.language],
        text: item.text[i18n.language],
        location: item.location[i18n.language],
        date: item.date[i18n.language]
      }));
  }, [state.currentIndex, state.itemsPerView, i18n.language]);

  const handleSlideChange = useCallback((direction) => {
    if (state.isAnimating) return;

    const adjustedDirection = isRTL ? -direction : direction;

    setState(prev => ({
      ...prev,
      isAnimating: true,
      direction: direction,
      currentIndex: (prev.currentIndex + adjustedDirection + totalPages) % totalPages
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
    }, 500);
  }, [totalPages, state.isAnimating, isRTL]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const dragThreshold = 50;

    if (Math.abs(offset) > dragThreshold) {
      const direction = offset > 0 ? -1 : 1;
      handleSlideChange(direction);
    }
  };



  useEffect(() => {
    const handleResize = () => {
      setState(prev => ({
        ...prev,
        itemsPerView: window.innerWidth < 640 ? 1 : 2
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNavigationButton = (direction) => (
    <button
      onClick={() => handleSlideChange(direction)}
      className={`absolute top-1/2 -translate-y-1/2 z-10 
        w-12 h-12 flex items-center justify-center rounded-full 
        bg-white/90 shadow-lg
        ${isDarkMode ? 'text-gray-800' : 'text-gray-900'}`}
      style={{
        [direction > 0 ? 'right' : 'left']: '0rem'
      }}
    >
      {isRTL ?
        (direction > 0 ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />) :
        (direction > 0 ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />)
      }
    </button>
  );

  return (
    <section className={`py-10 relative cairo overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {
        loading ? null :
          <>
            <div className="absolute inset-0 opacity-50 w-full h-full" style={{ contain: 'layout paint size', willChange: 'transform' }} id='testimonials'>
              <CornerLights />
            </div>

            <div className="container mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('testimonials.title')}
                </h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
                />
                <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('testimonials.description')}
                </p>
              </motion.div>


              <Swiper
                spaceBetween={20}
                slidesPerView={7.5}
                autoplay={true}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                breakpoints={{
                  1400: {
                    slidesPerView: 3,
                  },
                  1100: {
                    slidesPerView: 2,
                  },
                  767: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 1,
                    autoplay: false,
                  },
                  640: {
                    slidesPerView: 1,
                    autoplay: false,
                  },
                  100: {
                    slidesPerView: 1,
                    autoplay: false,
                  },
                }}
              >
                {data?.map((testimonial) =>
                  <SwiperSlide key={testimonial.id}>
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      isDarkMode={isDarkMode}
                    />
                  </SwiperSlide>
                )}
              </Swiper>

            
            </div>
          </>
      }
    </section>
  );
};

export default memo(Testimonials);
