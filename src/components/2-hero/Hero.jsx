import { motion, useScroll, useTransform, useSpring, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, PhoneIncoming } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../apiConfig';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import parse from 'html-react-parser';
import BackgroundEffects from '../0-Background/BackgroundEffects';
import CTAButton from '../shared/CTAButton';
import { Loading } from '../shared/Loading';
import 'swiper/css';

const animations = {
  badge: {
    initial: { 
      y: -30, 
      opacity: 0,
      scale: 0.8 
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  },
  container: {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  },
  item: {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }
};

function HeroSection() {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = document.documentElement.dir === 'rtl';
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ partners: [] });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const springConfig = {
    stiffness: 500,
    damping: 200,
    mass: 1
  };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, .8], [1, 0.95]),
    springConfig
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0, -30]),
    springConfig
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/header`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="min-h-[120vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section 
      id="home" 
      ref={sectionRef} 
      className="h-full min-h-screen md:pt-12 pt-8 w-full relative overflow-hidden flex items-center justify-center"
    >
      <BackgroundEffects />

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <motion.div
            style={{ scale, y }}
            className="relative z-10 container flex items-center justify-center m-auto overflow-hidden"
          >
            <div className="flex flex-col max-w-6xl w-full px-6 sm:px-8 mx-auto">
              <motion.div
                variants={animations.badge}
                initial="initial"
                animate="animate"
                className="flex mt-0 md:mt-10 justify-center w-full"
              >
                <div className="custom-badge mb-6">
                  <div className={`
                    badge-content
                    inline-flex items-center gap-1.5 
                    border border-violet-500/30
                    px-3 py-2
                    backdrop-blur-xl
                    ${isDarkMode ? 'bg-gray-900/40 text-white' : 'bg-white/40 text-black'}
                  `}>
                    
                    <span className="z-10 font-cairo text-sm font-medium">
                      {t('hero.badge')}
                    </span>
                    <ShieldCheck className={`
                      w-4 h-5 z-10 
                      ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}
                    `} />
                    <div className="hover-effect">
                      <div className="gradient-circle"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col items-center justify-center text-center space-y-8">
                <motion.h1 
                  variants={animations.item}
                >
                  <span className={`
                    block text-4xl sm:text-5xl md:text-6xl 
                    font-bold 
                    bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400
                    bg-clip-text text-transparent
                    drop-shadow-sm
                  `}>
                    {t('common.name')}
                  </span>
                  <p className={`
                      text-3xl  md:text-4xl xl
                    font-bold leading-relaxed
                    max-w-5xl mx-auto  font-bold
                    ${isDarkMode ? 'text-white/90' : 'text-gray-800'}
                  `}>
                    {parse(data.description)}
                  </p>
                </motion.h1>
                <motion.div 
  variants={animations.item}
  className="flex flex-wrap gap-3 md:gap-6 justify-center items-center"
>
  <CTAButton
    size="md"
    onClick={() => window.location.href = `https://wa.me/${data.mobile}?text=${data.contactUsText}`}
    className="group inline-flex  font-ibm flex align-center  justify-center  items-center gap-2"
  >
    <span>{t('hero.buttons.start')}</span>
    <PhoneIncoming 
      className={`w-4 h-4  md:w-5 md:h-5  transition-transform duration-300 
        ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
    />
  </CTAButton>

  <Link to="/gallery">
    <button
      className="group inline-flex flex align-center justify-center items-center gap-2"
    >
      {t('hero.buttons.work')}
    </button>
  </Link>
</motion.div>

                <motion.div
                  variants={animations.item}
                  className="w-full overflow-hidden space-y-4 lg:space-y-6"
                >
                  <h3 className={`
                    text-md font-medium text-center
                    ${isDarkMode ? 'text-white/80' : 'text-gray-700'}
                  `}>
                    {t('ourPartners.title')}
                  </h3>
                  
                  {/* First Swiper - Left to Right */}
                  <Swiper
                    modules={[Autoplay]}
                    slidesPerView={3}
                    breakpoints={{
                      480: { slidesPerView: 4 },
                      640: { slidesPerView: 5 },
                      768: { slidesPerView: 6 },
                      1024: { slidesPerView: 7 }
                    }}
                    spaceBetween={12}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      reverseDirection: false
                    }}
                    loop={true}
                    className="partners-swiper"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {data.partners.map((partner) => (
                      <SwiperSlide key={`first-${partner.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20
                            flex items-center justify-center mx-auto"
                        >
                          <img
                            src={partner}
                            alt="Partner logo"
                            className={`
                              w-full h-full object-contain rounded-2xl
                              transition-all duration-300
                              ${isDarkMode 
                                ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]' 
                                : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'}
                              hover:brightness-110
                            `}
                            loading="lazy"
                          />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Second Swiper - Right to Left */}
                  <Swiper
                    modules={[Autoplay]}
                    slidesPerView={3}
                    breakpoints={{
                      480: { slidesPerView: 4 },
                      640: { slidesPerView: 5 },
                      768: { slidesPerView: 6 },
                      1024: { slidesPerView: 7 }
                    }}
                    spaceBetween={6}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      reverseDirection: true
                    }}
                    loop={true}
                    className="partners-swiper"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {data.partners.map((partner) => (
                      <SwiperSlide key={`second-${partner.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20
                            flex items-center justify-center mx-auto"
                        >
                          <img
                            src={partner}
                            alt="Partner logo"
                            className={`
                              w-full h-full object-contain rounded-2xl
                              transition-all duration-300
                              ${isDarkMode 
                                ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]' 
                                : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]'}
                              hover:brightness-110
                            `}
                            loading="lazy"
                          />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
    </section>
  );
}

export default HeroSection;