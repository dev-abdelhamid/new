import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Clock, 
  Users,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { API_BASE_URL } from '../../../src/apiConfig';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import "swiper/css";

const RelatedCard = ({ image, title, description, link }) => (
  <Link to={link} className="block group">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{description}</p>
      </div>
    </motion.div>
  </Link>
);

const StatCard = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
  >
    <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-gray-600 dark:text-gray-300 text-sm">{label}</div>
  </motion.div>
);

const ServiceDetails = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/service/${id}`, {
          headers: { 'Accept-Language': i18n.language }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id, i18n.language]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`مرحباً، أرغب في الاستفسار عن خدمة ${data.title}`);
    window.open(`https://wa.me/+905528255694?text=${message}`, '_blank');
  };

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          loop={true}
          modules={[Autoplay, Navigation]}
          className="mt-20"
        >
          {data.sliders.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[60vh] min-h-[400px]">
                <img src={slide} alt="Service" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="container mx-auto px-4 text-center">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-6xl font-bold mb-6"
                    >
                      {data.title}
                    </motion.h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose dark:prose-invert max-w-none"
            >
              {parse(data.description)}
            </motion.div>

            {/* Features Grid */}
            <div>
              <h2 className="text-3xl font-bold mb-8">مميزات الخدمة</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                  >
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-20 h-20 mx-auto rounded-xl mb-4" 
                    />
                    <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6">
              <StatCard icon={Star} value="4.9" label="تقييم العملاء" />
              <StatCard icon={Users} value="500+" label="عميل سعيد" />
              <StatCard icon={Clock} value="24/7" label="دعم فني" />
            </div>

            {/* Process Steps */}
            <div>
              <h2 className="text-3xl font-bold mb-8">خطوات العمل</h2>
              <div className="space-y-6">
                {data.process?.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full animate-pulse">
                    عرض خاص
                  </div>
                  <h3 className="text-2xl font-bold mb-4">احصل على الخدمة الآن</h3>
                  <div className="space-y-4 mb-6">
                    {data.advantages.map((advantage, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{advantage.title}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsAppClick}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span>تواصل عبر واتساب</span>
                    </motion.button>

                    <motion.a
                      href="tel:+905528255694"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center gap-3"
                    >
                      <Phone className="w-6 h-6" />
                      <span>اتصل بنا مباشرة</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Related Services */}
              {data.relatedServices?.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6">خدمات مشابهة</h3>
                  <div className="space-y-4">
                    {data.relatedServices.map((service) => (
                      <RelatedCard
                        key={service.id}
                        {...service}
                        link={`/service/${service.id}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Related Articles */}
              {data.relatedArticles?.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6">مقالات ذات صلة</h3>
                  <div className="space-y-4">
                    {data.relatedArticles.map((article) => (
                      <RelatedCard
                        key={article.id}
                        {...article}
                        link={`/blog/${article.id}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

     
    <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-24 overflow-hidden">
      {/* Animated Loader Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="loader scale-150">
          <div className="box">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                <path d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z"></path>
                <path d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z"></path>
                <path d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z"></path>
              </svg>
            </div>
          </div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">جاهز لبدء مشروعك؟</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">دعنا نحول فكرتك إلى واقع ملموس</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-donate" onClick={handleWhatsAppClick}>
              احصل على عرض سعر مجاني
            </button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all"
            >
              تواصل معنا مباشرة
            </motion.button>
          </div>
        </motion.div>
      </div>

     </div>
  </div>

    
  );
};

export default memo(ServiceDetails);