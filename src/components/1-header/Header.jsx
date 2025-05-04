import { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  ShoppingBag,
  Globe,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Logo } from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

const MENU_ITEMS = [
  { name: "home", href: "#home" },
  
  { name: "gallery", href: "/Gallery" },
  { name: "services", href: "/all-services" },
  { name: "blog", href: "/blog" },
  { name: "about", href: "/about" },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const [state, setState] = useState({
    isMenuOpen: false,
    scrolled: false,
    activeSubmenu: null,
    activeSection: "",
    isLoading: false,
    isNavigating: false
  });

  const scrollTimeoutRef = useRef(null);
  const navigationTimeoutRef = useRef(null);
  const observersRef = useRef([]);

  const fontClass = i18n.language === "ar" ? "cairo font-bold" : "cairo font-bold";

  // Scroll to top on page navigation
  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      window.cancelAnimationFrame(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.requestAnimationFrame(() => {
      setState(prev => ({
        ...prev,
        scrolled: window.scrollY > 20
      }));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Enhanced section observer
  useEffect(() => {
    const sectionIds = ["home", "services", "about", "contact"];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !state.isNavigating) {
          setState(prev => ({
            ...prev,
            activeSection: entry.target.id
          }));
        }
      });
    };

    const observerOptions = {
      threshold: [0.2, 0.5, 0.8],
      rootMargin: `-${headerRef.current?.offsetHeight || 0}px 0px 0px 0px`
    };

    const observers = sectionIds.map(id => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(section);
        return { observer, element: section };
      }
      return null;
    }).filter(Boolean);

    observersRef.current = observers;

    return () => {
      observers.forEach(({ observer, element }) => observer.unobserve(element));
    };
  }, [state.isNavigating]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!headerRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) {
        setState(prev => ({
          ...prev,
          isMenuOpen: false,
          activeSubmenu: null
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll with easing
  const scrollToSection = useCallback(async (sectionId, offset = 0) => {
    const element = document.querySelector(sectionId);
    if (!element) return false;

    setState(prev => ({ ...prev, isNavigating: true }));

    const start = window.pageYOffset;
    const end = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const duration = 1000;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, start + (end - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setState(prev => ({ ...prev, isNavigating: false }));
      }
    };

    requestAnimationFrame(animateScroll);
    return true;
  }, []);

  // Navigation handler
  const handleNavigation = async (href, e) => {
    e.preventDefault();

    setState(prev => ({ ...prev, isLoading: true }));
    const headerOffset = headerRef.current?.offsetHeight || 0;

    try {
      if (href.startsWith('#')) {
        if (location.pathname === '/') {
          await scrollToSection(href, headerOffset);
        } else {
          navigate('/', {
            state: { targetSection: href.substring(1) }
          });
        }
      } else {
        navigate(href);
      }
    } finally {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isMenuOpen: false,
        activeSubmenu: null
      }));
    }
  };

  // Handle target section after navigation
  useEffect(() => {
    if (location.state?.targetSection) {
      const headerOffset = headerRef.current?.offsetHeight || 0;

      navigationTimeoutRef.current = setTimeout(async () => {
        const success = await scrollToSection(
          `#${location.state.targetSection}`,
          headerOffset
        );

        if (success) {
          navigate(location.pathname, {
            replace: true,
            state: {},
          });
        }

        setState(prev => ({ ...prev, isLoading: false }));
      }, 150);
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }

    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [location.state, navigate, scrollToSection]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(ar|en)/, `/${newLang}`);
    
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    navigate(newPath);
  };
  

  // Menu handlers
  const handleMenuToggle = () => {
    setState(prev => ({
      ...prev,
      isMenuOpen: !prev.isMenuOpen,
      activeSubmenu: null
    }));
  };

  const handleSubmenuToggle = (menuName, event) => {
    event.preventDefault();
    setState(prev => ({
      ...prev,
      activeSubmenu: prev.activeSubmenu === menuName ? null : menuName
    }));
  };



  // Render methods
  const renderThemeToggle = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`
      flex items-center gap-1 px-3 py-2 text-xs
      ${isDarkMode
          ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
        }
      rounded-xl transition-all duration-300
    `}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDarkMode ? "dark" : "light"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? (
            <Sun className="w-3 h-3 text-yellow-400" />
          ) : (
            <Moon className="w-3 h-3 text-purple-700" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );

  const renderServiceButton = (isMobile = false) => (
    <div className={`flex ${isMobile ? "w-full justify-center" : ""}`}>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`
        group flex items-center gap-2 
        ${isMobile ? "px-4 py-2 " : "px-5 py-2 text-sm"}
        text-white font-medium
        bg-blue-500 hover:bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-400
        rounded-xl transition-all duration-300 ${fontClass}
        relative overflow-hidden shadow-lg hover:shadow-xl
        whitespace-nowrap
      `}
      >
        <span className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        <ShoppingBag className={`${isMobile ? "w-5 h-5" : "w-4 h-4"} relative z-10`} />
        <span className="relative z-10">{t("common.requestService")}</span>
      </motion.button>
    </div>
  );

  const renderMenuItem = (item, isMobile = false) => {
    const isHomePage = location.pathname === '/';
    const isActive = item.href.startsWith('#')
      ? isHomePage && state.activeSection === item.href.slice(1)
      : location.pathname === item.href;

    return (
      <motion.li
        key={item.name}
        className="relative group w-full"
      >
        <Link
          to={item.href}
          onClick={(e) => {
            if (item.subItems) {
              handleSubmenuToggle(item.name, e);
            } else {
              handleNavigation(item.href, e);
            }
          }}
          className={`
          block text-center whitespace-nowrap px-2 py-1 relative
          ${isDarkMode
              ? 'text-gray-200 hover:text-sky-400'
              : 'text-gray-700 hover:text-blue-600'}
          rounded-lg transition-all duration-300
          ${isActive ? isDarkMode ? 'text-sky-400 bg-sky-400/10' : 'text-blue-600 bg-blue-500/40' : ''}
          hover:bg-gradient-to-r 
          ${isDarkMode
              ? 'hover:from-sky-400/10 hover:to-sky-500/5'
              : 'hover:from-blue-50/50 hover:to-blue-100/30'}
          ${fontClass}
          group transform hover:-translate-y-0.5 text-sm
        `}
        >
          <div className="flex items-center justify-center gap-1">
            <span>{t(`navigation.${item.name}`)}</span>
            {item.subItems && (
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 
              ${state.activeSubmenu === item.name ? 'rotate-180' : ''}
              ${isDarkMode ? 'text-sky-400' : 'text-blue-600'}`}
              />
            )}
          </div>

          <div className={`
          absolute bottom-0 left-1 right-1 h-0.5
          ${isDarkMode
              ? 'bg-sky-400'
              : 'bg-blue-500'}
          transform origin-left transition-all duration-300
          ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          group-hover:scale-x-100 group-hover:opacity-100
          rounded-lg
        `} />
        </Link>

        {item.subItems && state.activeSubmenu === item.name && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`
            ${isMobile
                ? 'mt-2 w-64 p-2'
                : 'absolute left-0 mt-2 w-64 p-2'}
            ${isDarkMode
                ? 'bg-gray-900/95 border border-sky-400/20 shadow-lg shadow-sky-400/10'
                : 'bg-white/95 border border-blue-100 shadow-lg shadow-blue-100/20'}
            rounded-xl z-50 backdrop-blur-sm
          `}
          >
            {item.subItems.map((subItem) => {
              const isSubItemActive = location.pathname === subItem.href;

              return (
                <motion.div
                  key={subItem.name}
                  whileHover={{ scale: 1.02, x: 3, y: -1 }}
                >
                  <Link
                    to={subItem.href}
                    onClick={(e) => handleNavigation(subItem.href, e)}
                    className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg
                    ${isDarkMode
                        ? `text-gray-200 hover:text-sky-400 hover:bg-sky-400/10 
                         ${isSubItemActive ? 'text-sky-400 bg-sky-400/10' : ''}`
                        : `text-gray-700 hover:text-blue-600 hover:bg-blue-50/50
                         ${isSubItemActive ? 'text-blue-600 bg-blue-50' : ''}`}
                    transition-all duration-300 ${fontClass}
                  `}
                  >
                    <span className={`
                    transition-colors duration-300
                    ${isSubItemActive
                        ? isDarkMode ? 'text-white' : 'text-blue-600'
                        : 'text-sky-500'}
                  `}>
                      {subItem.icon}
                    </span>
                    <span>{t(`services.${subItem.name}.title`)}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.li>
    );
  };

  return (
    <>

      <header
        ref={headerRef}
        className={` fixed top-0 w-full z-40 ${isDarkMode ? "bg-gray-900/80 shadow-lg backdrop-blur-lg border-b border-gray-800"
          : "bg-white/80 shadow-sm backdrop-blur-lg border-b border-gray-200"}

        }
       
        ${fontClass}
      `}
      >
        <div className="container mx-auto flex-shrink-0 px-4">
          <div className="flex items-center justify-between h-20 py-2">
            <Logo />

            <nav className="hidden cursor-pointer lg:block">
              <ul className="flex items-center justify-center gap-8">
                {MENU_ITEMS.map((item) => renderMenuItem(item))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              {renderThemeToggle()}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className={`
                inline-flex cairo font-bold
                flex cursor-pointer content-center items-center justify-center gap-1 px-2 py-2 text-xs
                ${isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }
                rounded-xl transition-all duration-300 ${fontClass}
              `}
              >
                <Globe size={12} />
                <span>{i18n.language === "ar" ? "EN" : "AR"}</span>
              </motion.button>

              <div className="hidden xl:block">{renderServiceButton()}</div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMenuToggle}
                className={`
                lg:hidden p-1 rounded-xl
                ${isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    : "bg-gray-200 hover:bg-gray-200 text-gray-800"
                  }
                transition-all duration-300
              `}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {state.isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className={`
              lg:hidden fixed top-20 left-0 right-0 z-50
              ${isDarkMode
                  ? "bg-gray-900 border-t border-b border-gray-800"
                  : "bg-white border-t border-b border-gray-200"
                }
              shadow-lg
            `}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto flex flex-col gap-3 items-center px-4 py-4">
                <nav>
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                    className="flex flex-col space-y-3"
                  >
                    {MENU_ITEMS.map((item) => renderMenuItem(item, true))}
                  </motion.ul>
                </nav>
                {renderServiceButton(true)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};