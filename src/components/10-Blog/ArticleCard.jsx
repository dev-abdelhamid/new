import { ImageOff, Facebook, Twitter,  } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Props interface
const ArticleCard = ({ 
  title, // Article title
  description, // Article description
  image, // Image URL
  slug, // Article URL slug
  tags = [], // Array of tags

}) => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blog/${slug}`,
    twitter: `https://twitter.com/intent/tweet?url=${window.location.origin}/blog/${slug}&text=${title}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`
        group flex flex-col
        w-full sm:w-[340px] md:w-[380px]
        h-[420px] mx-auto 
        rounded-xl overflow-hidden
        ${isDarkMode 
          ? 'bg-gray-900 border-gray-800' 
          : 'bg-white border-gray-200'
        }
        border transition-all duration-300
        hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10
      `}
    >
      {/* Image Section */}
      <div className="relative h-[55%] overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageOff className="w-10 h-10 text-gray-400" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Social Share Buttons */}
        <div className={`
          absolute top-2 ${isRTL ? 'right-3' : 'left-3'}
          flex gap-2
        `}>
          {Object.entries(shareUrls).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`
                p-2 rounded-full backdrop-blur-sm
                ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/90'}
                text-blue-500 hover:bg-blue-500 hover:text-white
                transition-all duration-300 hover:scale-110
              `}
            >
              {platform === 'facebook' && <Facebook className="w-4 h-4" />}
              {platform === 'twitter' && <Twitter className="w-4 h-4" />}
            </a>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col items-center text-center">
        <Link 
          to={`/blog/${slug}`}
          className={`
            text-lg font-bold mb-1 line-clamp-1
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
            hover:text-blue-500 transition-colors duration-300
          `}
        >
          {title}
        </Link>

        <p className={`
          text-sm leading-relaxed mb-2 line-clamp-2 max-w-[90%]
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
        `}>
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
  {Array.isArray(tags) && tags.slice(0, 3).map((tag, i) => (
    <span 
      key={i} 
      className={`
        text-xs px-2.5 py-1 rounded-full border border-blue-500
        ${isDarkMode 
          ? 'bg-gray-800 text-gray-200' 
          : 'bg-gray-100 text-gray-800'
        }
        hover:bg-blue-500 hover:text-white
        transition-colors duration-300
      `}
    >
      #{tag}
    </span>
  ))}
</div>

        <Link
          to={`/blog/${slug}`}
          className={`
            mt-auto mx-auto 
            flex items-center justify-center gap-2
            py-2.5 px-8 shadow-lg rounded-lg text-sm font-medium
            bg-blue-500 text-white
            hover:bg-blue-600 hover:scale-105
            transition-all duration-300
            ${isRTL ? 'flex-row-reverse' : ''}
          `}
        >
          {t('readMore')}
        </Link>
      </div>
    </motion.div>
  );
};
ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.object,
  publishDate: PropTypes.string,
  readTime: PropTypes.number,
  category: PropTypes.string
};

export default ArticleCard;