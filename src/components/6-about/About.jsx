import { motion } from 'framer-motion';
import { CheckCircle, Users, Trophy, Target, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../src/apiConfig';

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const About = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = document.documentElement.dir === 'rtl';

  const stats = [
    {
      icon: Users,
      value: '190',
      label: t('about.stats.label1'),
      gradient: 'from-blue-100 to-blue-50',
      suffix: '+'
    },
    {
      icon: Trophy,
      value: '200',
      label: t('about.stats.label2'),
      gradient: 'from-violet-100 to-violet-50',
      suffix: '+'
    },
    {
      icon: Target,
      value: '99',
      label: t('about.stats.label3'),
      gradient: 'from-violet-100 to-violet-50',
      suffix: '%'
    },
    {
      icon: Star,
      value: '389',
      label: t('about.stats.label4'),
      gradient: 'from-blue-100 to-blue-50',
      suffix: '+'
    }
  ];

  const features = [
    t('about.features.0'),
    t('about.features.1'),
    t('about.features.2'),
    t('about.features.3'),
    t('about.features.4'),
    t('about.features.5'),
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_BASE_URL}/about-us`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  console.log(data);

  return (
    <section id="about" ref={ref} className={` py-8 font-cairo relative overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`absolute inset-0  ${isDarkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 opacity-50' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-70'}`} />
      <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="container mx-auto px-4 relative">
        <h2 className={` text-3xl font-bold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'} `} > {t('about.title')} </h2>
        <div className="h-1 bg-blue-500 w-12 mx-auto rounded-full mb-10" />
        {
          loading ? null :
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div variants={itemAnimation} className="space-y-8"  >
                <div className={`text-center  ${isRTL ? 'lg:text-right' : 'lg:text-left'} space-y-2 `}>
                  <h3 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.title}</h3>
                  <p className={` text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} `}>{data.description}</p>
                </div>

                <div className="w-full flex flex-col items-center lg:items-start">
                  <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data?.features.map((feature, index) => (
                      <div className={` w-full flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-500/20' : 'bg-gray-500/10'} `}>
                        <CheckCircle className={`w-8 h-8 text-blue-500 order-first p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} `} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-black'} ${isRTL ? 'text-right' : 'text-left'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>

              <motion.div variants={itemAnimation}  className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2  gap-4" >
                {data?.items.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div key={index} variants={itemAnimation} className={` p-6 rounded-2xl ${isDarkMode ? `bg-blue-500/5  border border-blue-500` : `bg-slate-800/10  border border-slate-700/20 ${stat.gradient}  shadow-sm`}  ${index >= stats.length - 2 ? "col-span-1 md:col-span-1" : ""} flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]`} >
                      <div className={`p-3 rounded-full mb-2 shrink-0 sm:mb-2 md:mb-4  ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/80'}`}>
                        <img src={stat.image} alt={stat.text} className="w-full aspect-square object-cover rounded-full"  />
                      </div>
                      <div className={` text-2xl font-bold mb-2  ${isDarkMode ? 'text-white' : 'text-gray-950'}  `}>
                        {inView && ( <CountUp  start={0}  end={parseInt(stat.number)} duration={4} suffix={stat.suffix}  /> )}
                      </div>
                      <div className={` text-sm text-center  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} `}>
                        {stat.text}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
        }
      </motion.div>
    </section>
  );
};

export default About;
