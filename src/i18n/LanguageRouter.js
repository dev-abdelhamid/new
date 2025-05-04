import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageRouter = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const currentPath = location.pathname;
    const currentLang = i18n.language;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // Only redirect if path doesn't start with language code
    if (!['ar', 'en'].includes(pathSegments[0])) {
      const newPath = `/${currentLang}${currentPath}`;
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, i18n.language]);

  return children;
};
