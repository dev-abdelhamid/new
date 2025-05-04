import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
  hover: { 
    y: -5,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

export const ProjectCard = ({ project }) => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <motion.div 
      className={`relative w-[400px] h-[300px] rounded-2xl overflow-hidden group ${
        isDarkMode ? 'shadow-blue-500/10' : 'shadow-gray-200/50'
      }`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className={`absolute inset-0  p-6 flex flex-col justify-end ${
        isDarkMode 
          ? 'bg-gradient-to-t from-black/90 via-black/60 to-transparent'
          : 'bg-gradient-to-t from-black/80 via-black/50 to-transparent'
      }`}>
        <h3 className="text-2xl font-bold text-white mb-2">
          {currentLang === 'ar' ? project.titleAr : project.titleEn}
        </h3>
        <p className="text-gray-200 text-sm mb-4">
          {currentLang === 'ar' ? project.descriptionAr : project.descriptionEn}
        </p>
      </div>

      <motion.div 
        className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          isDarkMode 
            ? 'bg-black/50 backdrop-blur-sm'
            : 'bg-black/40 backdrop-blur-sm'
        }`}
      >
        <motion.button
          className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg ${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/20'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-blue-500/25'
          }`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {t('viewDetails')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleAr: PropTypes.string.isRequired,
    titleEn: PropTypes.string.isRequired,
    descriptionAr: PropTypes.string.isRequired,
    descriptionEn: PropTypes.string.isRequired,
  }).isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default ProjectCard;
