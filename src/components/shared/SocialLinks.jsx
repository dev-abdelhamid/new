import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { socialLinks } from "../../config/contactConfig";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";

const SocialLinks = () => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = i18n.language === 'ar';

  const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const bounceAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const rotateAnimation = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: 360,
      scale: 1.2,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const gradientAnimation = {
    initial: { scale: 0, opacity: 0 },
    hover: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-center gap-4`}
      variants={containerAnimation}
      initial="initial"
      animate="animate"
    >
      {socialLinks.map((social, index) => {
        const Icon = Icons[social.icon];
        
        return (
          <motion.div
            key={index}
            variants={bounceAnimation}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="transform-gpu"
          >
            <motion.a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center justify-center
                w-12 h-12 rounded-full
                ${isDarkMode ? 'bg-gray-800/90' : 'bg-white'}
                ${social.color}
                hover:text-white
                shadow-lg hover:shadow-xl
                relative
                overflow-hidden
                group
                transform-gpu transition-all duration-300
              `}
            >
              <motion.div
                variants={rotateAnimation}
                className="relative z-10"
              >
                <Icon className="w-5 h-5" />
              </motion.div>

              <motion.div
                variants={gradientAnimation}
                className={`
                  absolute inset-0
                  ${social.gradient}
                  rounded-full
                  shadow-inner
                `}
              />
            </motion.a>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;
