import { motion} from 'framer-motion';
import {projects} from './projects'
import {ProjectCard } from './ProjectCard'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Hero } from './Hero';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';

import { useTheme } from '../../Context/ThemeContext'
import { useTranslation } from 'react-i18next';
import { StatisticsSection } from './StatisticsSection.jsx';
import VisionSection from './VisionMissionSection';


const translations = {
  stats: {
    clients: {
      en: "Happy Clients",
      ar: "عميل سعيد"
    },
    projects: {
      en: "Completed Projects",
      ar: "مشروع منجز"
    },
    experience: {
      en: "Years Experience",
      ar: "سنوات خبرة"
    },
    support: {
      en: "Technical Support",
      ar: "دعم فني"
    }
  },
  projects: {
    title: {
      en: "Our Proud Work",
      ar: "أعمال نفتخر بها"
    },
    subtitle: {
      en: "We provide innovative solutions and distinguished projects that meet our clients' needs",
      ar: "نقدم حلولاً مبتكرة ومشاريع متميزة تلبي احتياجات عملائنا"
    }
  },
  future: {
    badge: {
      en: "Towards an Integrated Digital Future",
      ar: "نحو مستقبل رقمي متكامل"
    },
    description: {
      en: "We strive for excellence and leadership in technology through innovative and sustainable solutions",
      ar: "نسعى لتحقيق التميز والريادة في عالم التقنية من خلال حلول مبتكرة ومستدامة"
    }
  },
  cta: {
    title: {
      en: "Ready to Start Your Project With Us?",
      ar: "هل أنت جاهز لبدء مشروعك معنا؟"
    },
    subtitle: {
      en: "Let's turn your ideas into reality",
      ar: "دعنا نحول أفكارك إلى واقع ملموس"
    },
    button: {
      en: "Contact Us Now",
      ar: "تواصل معنا الآن"
    }
  }
};

const swiperConfig = {
  modules: [Autoplay],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
};

const AboutUsPage = () => {
  const { isDarkMode } = useTheme();
  const {  i18n } = useTranslation();
  const currentLang = i18n.language;



  return (
    <div className={`min-h-screen font-[cairo] mt-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
        <Hero />
      </section>

      <AboutSection />

    

  {/* Projects Section */}
<section className={`py-10 ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'} overflow-hidden`}>
  <div className="max-w-7xl mx-auto px-4">
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
        {translations.projects.title[currentLang]}
      </h2>
      <p className={`text-sm max-w-xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {translations.projects.subtitle[currentLang]}
      </p>
    </motion.div>

    <div className="space-y-6">
    <Swiper 
        {...{ 
          ...swiperConfig, 
          autoplay: { 
            ...swiperConfig.autoplay, 
            delay: 3500,
            reverseDirection: false
          }
        }}
        className="!overflow-hidden"
      >
        {[...projects].reverse().map((project, index) => (
          <SwiperSlide key={`backward-${index}`}>
            <div className="flex justify-center px-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProjectCard project={project} isDarkMode={isDarkMode} />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper 
        {...{ 
          ...swiperConfig, 
          autoplay: { 
            ...swiperConfig.autoplay, 
            delay: 3500,
            reverseDirection: true 
          }
        }}
        className="!overflow-hidden"
      >
        {[...projects].reverse().map((project, index) => (
          <SwiperSlide key={`backward-${index}`}>
            <div className="flex justify-center px-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProjectCard project={project} isDarkMode={isDarkMode} />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
</section>

      
      
      
      
      <StatisticsSection />

      <VisionSection />


<TeamSection />

{/* Contact CTA Section */}
<section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
  <div className="max-w-4xl mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
        {translations.cta.title[currentLang]}
      </h2>
      <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {translations.cta.subtitle[currentLang]}
      </p>
      <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
        {translations.cta.button[currentLang]}
      </button>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default AboutUsPage;
