import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationManager } from './navigation';

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path, options = {}) => {
    const { 
      saveHistory = true, 
      scrollToTop = true,
      preserveQuery = false 
    } = options;

    if (saveHistory) {
      NavigationManager.push(location.pathname);
    }

    const query = preserveQuery ? location.search : '';
    navigate(`${path}${query}`);

    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  };

  const handleSectionNavigation = (href, headerOffset = 0) => {
    const isInternalLink = href.startsWith('#');
    const isHomePage = location.pathname === '/';

    if (isInternalLink) {
      if (isHomePage) {
        scrollToSection(href, headerOffset);
      } else {
        localStorage.setItem('scrollTarget', href);
        localStorage.setItem('headerOffset', headerOffset.toString());
        navigateTo('/', { scrollToTop: false });
      }
    } else {
      navigateTo(href);
    }
  };

  const scrollToSection = (targetId, headerOffset) => {
    const element = document.querySelector(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const goBack = (fallbackPath = '/') => {
    const previousPath = NavigationManager.pop();
    navigate(previousPath || fallbackPath);
  };

  return { 
    navigateTo, 
    goBack, 
    handleSectionNavigation,
    scrollToSection,
    currentPath: location.pathname 
  };
}
