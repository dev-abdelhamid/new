import { motion , AnimatePresence} from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import * as Icons from "lucide-react";
import { footerConfig } from "../../config/footerConfig";
import { useTheme } from "../../Context/ThemeContext";
import SocialLinks from "../shared/SocialLinks";
import ScrollToTop from "./ScrollToTop";
import { Link } from "react-router-dom";
import { Logo } from "../1-header/Logo";

// Animations configuration
const animations = {
  container: {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const language = i18n.language;
  const { quickLinksColumn1, quickLinksColumn2 } = footerConfig;

  const renderQuickLinks = (column, columnIndex) => (
    <ul key={columnIndex} className="space-y-3">
      {column?.map((link, index) => {
        const Icon = Icons[link.icon];
        return (
          <motion.li 
            key={index}
            whileHover={{ x: language === "ar" ? -5 : 5 }}
          >
            <Link
              to={link.href}
              className={`group flex items-center justify-center gap-2
                ${isDarkMode ? 'text-white/90 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}
                transition-colors duration-300`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span className="mx-2">{t(link.title)}</span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );

  const renderTerms = () => {
    const terms = t("footer.terms", { returnObjects: true });
    return Array.isArray(terms) ? terms.map((item, index) => (
      <motion.a
        key={index}
        href="#"
        whileHover={{ scale: 1.05 }}
        className={`text-md cursor-pointer ${
          isDarkMode 
            ? 'text-white/90 hover:text-blue-400' 
            : 'text-gray-600 hover:text-blue-600'
        } transition-all duration-300`}
      >
        {item}
      </motion.a>
    )) : null;
  };

  return (
    <footer 
      className={`relative overflow-hidden pt-16 ${
        isDarkMode ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
      }`} 
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <AnimatePresence>
        <motion.div 
          className="container mx-auto px-4 cairo relative"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "50px" }}
        >
          <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-3 gap-12 pb-12">
            {/* Brand Section */}
            <motion.div 
              variants={animations.item}
              className="transform  transition-all duration-300"
            >
              <div className="flex row justify-center items-center gap-3">
              <Logo />
              </div>
              <p className={`leading-relaxed mt-4 ${
                isDarkMode ? 'text-white/90' : 'text-gray-600'
              }`}>
                {t("footer.description")}
              </p>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div 
              variants={animations.item}
              className="space-y-4"
            >
              <motion.h4 
                className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                {t("footer.quickLinksTitle")}
              </motion.h4>
              <div className="grid grid-cols-2 gap-4">
                {[quickLinksColumn1, quickLinksColumn2].map((column, index) => 
                  renderQuickLinks(column, index)
                )}
              </div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div 
              variants={animations.item}
              className="space-y-6"
            >
              <motion.h4 
                className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                {t("footer.newsletterTitle")}
              </motion.h4>
              <p className={`text-center ${
                isDarkMode ? 'text-white/90' : 'text-gray-600'
              }`}>
                {t("footer.newsletterDescription")}
              </p>
              <motion.div 
                className="flex group"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className={`flex-1 px-4 lg:px-6 sm:px-4 py-2 backdrop-blur-xl border rounded-s-lg 
                    focus:outline-none focus:ring-1 focus:ring-blue-500 
                    ${isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700/50 text-white' 
                      : 'bg-gray-100/50 border-gray-200 text-gray-900'
                    } transition-all duration-300`}
                />
                <motion.button 
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-e-lg 
                    hover:opacity-90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </motion.button>
              </motion.div>
              <SocialLinks />
            </motion.div>
          </div>

          <motion.div 
            variants={animations.item}
            className="relative flex justify-center -mb-6 z-10"
          >
            <ScrollToTop />
          </motion.div>

          <motion.div
            variants={animations.item}
            className={`border-t py-8 ${
              isDarkMode ? 'border-gray-800/50' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center justify-center 2xl:gap-10 lg:gap-8 md:gap-4 gap-3">
                {renderTerms()}
              </div>
              <motion.p 
                variants={animations.item}
                className={`text-md flex items-center gap-1 ${
                  isDarkMode ? 'text-white/90' : 'text-gray-600'
                }`}
              >
                © {new Date().getFullYear()}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-semibold">
                  {t("footer.brand")}
                </span>{" "}
                {t("footer.madeWith")}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </footer>
  );
}
