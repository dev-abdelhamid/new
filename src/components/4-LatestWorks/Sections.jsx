import { motion } from 'framer-motion';
import { Package, Code, Users, Clock, Shield, Star, Database, LineChart, CheckCircle, ExternalLink, ShoppingCart } from 'lucide-react';
import { ImageGallery } from './ImageGallery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';


export const HeroSection = ({ project, currentLang, isDarkMode }) => (
  <div className="relative min-h-[60vh] overflow-hidden" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
    {/* Enhanced Decorative Elements */}
    <div className="absolute inset-0">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"
      />
      <img
        src={project.images[0]}
        alt={project.title}
        className="w-full h-full object-cover filter blur-sm scale-105"
      />
      <div className={`absolute inset-0 ${isDarkMode
        ? 'bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95'
        : 'bg-gradient-to-b from-white/95 via-white/90 to-gray-50/95'
        }`} />
    </div>

    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center relative">
        {/* Content Side */}
        <div className="order-2 lg:order-1 text-center lg:text-start">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-3xl sm:text-4xl md:text-5xl mb-8 leading-relaxed font-bold
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >

            {parse(project.name)}

          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 
                ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {project.title}
          </motion.h1>



          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              to={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                  flex items-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all
                  hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto justify-center"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{currentLang === 'ar' ? 'عرض حي' : 'Live Demo'}</span>
            </Link>

            <Link
              to={`https://wa.me/+905528255694?text=اريد منتج مشابه ل (${project.name})`}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg 
                  flex items-center gap-2 hover:from-emerald-600 hover:to-emerald-700 transition-all
                  hover:shadow-lg hover:shadow-emerald-500/25 w-full sm:w-auto justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              <Link to={`https://wa.me/+905528255694?text=اريد منتج مشابه ل (${project.name})`}>{currentLang === 'ar' ? 'طلب المنتج' : 'Order Now'}</Link>
            </Link>
          </motion.div>
        </div>

        {/* Image Gallery Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="order-1 lg:order-2 max-w-2xl mx-auto w-full"
        >
          <ImageGallery project={project} isDarkMode={isDarkMode} />
        </motion.div>
      </div>
    </div>
  </div>
);

HeroSection.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleEn: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    descriptionEn: PropTypes.string.isRequired,
    screenshots: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveUrl: PropTypes.string.isRequired,
    orderUrl: PropTypes.string.isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

import { useRef, useEffect } from 'react';


export const NavigationTabs = ({ sections, activeSection, setActiveSection, isDarkMode }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const activeButton = scrollRef.current?.querySelector(`[data-id="${activeSection}"]`);
    if (activeButton) {
      const container = scrollRef.current;
      const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeSection]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-10 backdrop-blur-lg border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800 bg-gray-900/80' : 'border-gray-200 bg-white/80'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 md:gap-4 
              overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': { display: 'none' }
          }}
        >

          {sections.map(section => (
            <motion.button
              key={section.id}
              data-id={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-2 relative whitespace-nowrap text- sm:text-base  
                  transition-all duration-300 flex-shrink-0 ${activeSection === section.id
                  ? 'text-blue-500'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <span className="relative z-10">{section.label}</span>
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg bg-blue-500/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <motion.div
                layoutId="activeLine"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                animate={{
                  opacity: activeSection === section.id ? 1 : 0,
                  scale: activeSection === section.id ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

NavigationTabs.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};



export const OverviewSection = ({ project, currentLang, isDarkMode }) => (
  <div className="d">
    <div className="grid md:grid-cols-2 gap-12 mb-7">
      {/* Left Column */}
      <div className="space-y-8">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">
            {currentLang === 'ar' ? 'نظرة عامة' : 'Overview'}
          </h2>
          <p className="text-lg leading-relaxed">
            {parse(project.description)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {project.overview.map((feature, index) => (
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className="font-semibold mb-2">
                {feature.overviewSectionTitle}
              </h3>
              <p>{feature.overviewSectionNumber}</p>
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="text-2xl font-bold text-blue-500 mb-2">
            {project.statistics.users}
          </div>
          <p className="text-sm opacity-80">
            {currentLang === 'ar' ? 'مستخدم نشط' : 'Active Users'}
          </p>
        </div>

        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="text-2xl font-bold text-purple-500 mb-2">
            {project.statistics.satisfaction}
          </div>
          <p className="text-sm opacity-80">
            {currentLang === 'ar' ? 'نسبة رضا العملاء' : 'Client Satisfaction'}
          </p>
        </div>
      </div> */}

        {/* Client Deliverables Section */}

      </div>

      {/* Right Column */}
      <div className="space-y-8">
        {/* Project Architecture */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            {currentLang === 'ar' ? 'الهيكل التقني' : 'Technical Architecture'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tools?.map((layer, index) => (
              // <motion.div
              //   key={index}
              //   className="relative p-4 border-2 border-dashed border-blue-500 rounded-lg"
              // >
              //   <span className="absolute -top-3 left-4 bg-white dark:bg-gray-800 px-2 text-sm font-medium">
              //     {layer}
              //   </span>
              //   <div className="flex flex-wrap gap-3">
              //     {layer.technologies.map((tech, idx) => (
              //       <div key={idx} className="flex items-center gap-2 text-sm">
              //         <img src={tech.icon} className="w-5 h-5" alt={tech.name} />
              //         {layer}
              //       </div>
              //     ))}
              //   </div>
              // </motion.div>
              <span className='p-2 bg-blue-500/10 rounded-md'>{layer}</span>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        {/* <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <LineChart className="w-5 h-5 text-green-500" />
          {currentLang === 'ar' ? 'مؤشرات الأداء' : 'Performance Metrics'}
        </h3>
        {project.performance?.map((metric, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-2">
              <span>{currentLang === 'ar' ? metric.labelAr : metric.labelEn}</span>
              <span className="text-green-500">{metric.value}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${metric.percentage}%` }}
                className="h-full bg-green-500 rounded-full"
              />
            </div>
          </div>
        ))}
      </div> */}

        {/* Testing & Quality Assurance */}
        {/* <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-teal-500" />
          {currentLang === 'ar' ? 'اختبار وضمان الجودة' : 'Testing & QA'}
        </h3>
        <div className="space-y-4">
          {project.testing?.map((test, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4 bg-teal-500/10 rounded-lg"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center">
                <div className="text-2xl font-bold text-teal-500">{test.coverage}%</div>
              </div>
              <div>
                <h4 className="font-medium">
                  {currentLang === 'ar' ? test.typeAr : test.typeEn}
                </h4>
                <p className="text-sm opacity-80">
                  {currentLang === 'ar' ? test.descriptionAr : test.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}

        {/* Security Features */}
        {/* <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-500" />
          {currentLang === 'ar' ? 'ميزات الأمان' : 'Security Features'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {project.security?.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-lg"
            >
              {feature.icon}
              <div>
                <h4 className="font-medium">
                  {currentLang === 'ar' ? feature.titleAr : feature.titleEn}
                </h4>
                <p className="text-sm opacity-80">
                  {currentLang === 'ar' ? feature.descriptionAr : feature.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Package className="w-5 h-5 text-blue-500" />
        {currentLang === 'ar' ? 'ما تم تسليمه للعميل' : 'Client Deliverables'}
      </h3>
      <div className="space-y-4">
        {project.deliverCustomer?.map((deliverable, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg">
            {parse(deliverable.text)}
          </div>
        ))}
      </div>
    </div>
  </div>
);



OverviewSection.propTypes = {
  project: PropTypes.shape({
    description: PropTypes.string.isRequired,
    descriptionEn: PropTypes.string.isRequired,
    deliveryTime: PropTypes.string.isRequired,
    deliveryTimeAr: PropTypes.string.isRequired,
    statistics: PropTypes.shape({
      users: PropTypes.string.isRequired,
      satisfaction: PropTypes.string.isRequired
    }).isRequired,
    architecture: PropTypes.arrayOf(
      PropTypes.shape({
        titleAr: PropTypes.string.isRequired,
        titleEn: PropTypes.string.isRequired,
        technologies: PropTypes.arrayOf(
          PropTypes.shape({
            icon: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
          })
        ).isRequired
      })
    ).isRequired,
    performance: PropTypes.arrayOf(
      PropTypes.shape({
        labelAr: PropTypes.string.isRequired,
        labelEn: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        percentage: PropTypes.number.isRequired
      })
    ).isRequired,
    testing: PropTypes.arrayOf(
      PropTypes.shape({
        coverage: PropTypes.number.isRequired,
        typeAr: PropTypes.string.isRequired,
        typeEn: PropTypes.string.isRequired,
        descriptionAr: PropTypes.string.isRequired,
        descriptionEn: PropTypes.string.isRequired
      })
    ).isRequired,
    security: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node.isRequired,
        titleAr: PropTypes.string.isRequired,
        titleEn: PropTypes.string.isRequired,
        descriptionAr: PropTypes.string.isRequired,
        descriptionEn: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export const FeaturesSection = ({ project, currentLang, isDarkMode }) => (
  <div className="space-y-12">
    <h2 className="text-3xl font-bold mb-8">
      {currentLang === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {project.keyFeature.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            } shadow-lg hover:shadow-xl transition-all group`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Star className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="font-semibold mb-3">{feature.name}</h3>
        </motion.div>
      ))}
    </div>
  </div>
);


FeaturesSection.propTypes = {
  project: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    featuresEn: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};

export const TechnicalSection = ({ project, currentLang, isDarkMode }) => (
  <div className="space-y-12">
    <h2 className="text-3xl font-bold mb-8"> {currentLang === 'ar' ? 'التفاصيل التقنية' : 'Technical Details'}  </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
        <Code className="w-8 h-8 text-blue-500 mb-4" />
        <h3 className="font-semibold mb-4">
          {currentLang === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tech, index) => (<span key={index} className="px-3 py-1 rounded-full text-sm bg-blue-500/10 text-blue-500" > {tech} </span>))}
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg`}>
        <Users className="w-8 h-8 text-purple-500 mb-4" />
        <h3 className="font-semibold mb-4">
          {currentLang === 'ar' ? 'الفئة المستهدفة' : 'Target Audience'}
        </h3>
        <ul className="space-y-2">
          {project.detailsDevelopment.map((item, index) => (
            <li key={index} className="flex items-center gap-2"> <span className="w-2 h-2 rounded-full bg-purple-500" /> {item.text} </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
TechnicalSection.propTypes = {
  project: PropTypes.shape({
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    targetAudience: PropTypes.arrayOf(PropTypes.string).isRequired,
    targetAudienceEn: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};
export const ProcessSection = ({ project, currentLang, isDarkMode }) => (
  <div className="space-y-12">
    <h2 className="text-3xl font-bold mb-8">
      {currentLang === 'ar' ? 'مراحل التطوير' : 'Development Process'}
    </h2>

    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-blue-500/20" />

      {project.stepDevelopment.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className={`relative grid grid-cols-2 gap-8 mb-12 ${index % 2 === 0 ? 'text-right' : 'text-left'
            }`}
        >
          <div className={`${index % 2 === 0 ? 'col-start-1' : 'col-start-2'}`}>
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'
              } shadow-lg`}>
              <h3 className="font-semibold mb-3">{step.title}</h3>
              <p className="text-sm opacity-80">{step.description}</p>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 top-6" />
        </motion.div>
      ))}
    </div>
  </div>
); ProcessSection.propTypes = {
  project: PropTypes.shape({
    process: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired,
    processEn: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};




export const RelatedProjects = ({ currentProject, projects, currentLang, isDarkMode }) => {
  // تصفية المشاريع المشابهة بناءً على الفئة (Category)
  const relatedProjects = projects
    .filter(
      project => project.id !== currentProject.id && project.category === currentProject.category
    )
    .slice(0, 3);  // عرض 3 مشاريع مشابهة فقط

  return (
    <div className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">
          {currentLang === 'ar' ? 'مشاريع مشابهة' : 'Related Projects'}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg group`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.screenshots[0]}  // أول صورة من لائحة الصور للمشروع
                  alt={currentLang === 'ar' ? project.title : project.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold mb-2">
                  {currentLang === 'ar' ? project.title : project.titleEn}
                </h3>
                <p className="text-sm opacity-80 mb-4 line-clamp-2">
                  {currentLang === 'ar' ? project.description : project.descriptionEn}
                </p>
                <Link
                  to={`/project/${project.id}`}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  {currentLang === 'ar' ? 'عرض المشروع' : 'View Project'} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

RelatedProjects.propTypes = {
  currentProject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,  // إضافة الفئة للمشروع
  }).isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      titleEn: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      descriptionEn: PropTypes.string.isRequired,
      screenshots: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired,  // إضافة الفئة للمشروع
    })
  ).isRequired,
  currentLang: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired
};


export const CallToAction = ({ project, currentLang, isDarkMode }) => (
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-16">
    <div className="container mx-auto px-4 text-center text-white">
      <h2 className="text-3xl font-bold mb-6">
        {currentLang === 'ar' ? 'هل أعجبك المشروع؟' : 'Interested in this project?'}
      </h2>
      <p className="text-xl mb-8 opacity-90">
        {currentLang === 'ar'
          ? 'دعنا نناقش كيف يمكننا تطوير مشروع مماثل لك'
          : "Let's discuss how we can develop a similar project for you"}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        {currentLang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
      </motion.button>
    </div>
  </div>
);
CallToAction.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleEn: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    descriptionEn: PropTypes.string.isRequired,
    screenshots: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  currentLang: PropTypes.string.isRequired
};