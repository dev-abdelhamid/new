import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useFooterNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollTimeout = useRef(null);

  const smoothScrollTo = useCallback((targetPosition) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToElement = useCallback((selector, headerHeight) => {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;
      smoothScrollTo(offsetPosition);
    }
  }, [smoothScrollTo]);

  const handleLinkClick = useCallback((href, e) => {
    e.preventDefault();
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;

    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        scrollToElement(href, headerHeight);
      } else {
        localStorage.setItem("scrollTarget", href);
        localStorage.setItem("headerHeight", headerHeight.toString());
        navigate("/", { replace: true });
      }
    } else {
      navigate(href, { 
        replace: true,
        state: { prevPath: location.pathname }
      });
      smoothScrollTo(0);
    }
  }, [navigate, location.pathname, scrollToElement, smoothScrollTo]);

  useEffect(() => {
    const scrollTarget = localStorage.getItem("scrollTarget");
    const headerHeight = parseInt(localStorage.getItem("headerHeight"), 10);

    if (scrollTarget && location.pathname === "/") {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        scrollToElement(scrollTarget, headerHeight);
        localStorage.removeItem("scrollTarget");
        localStorage.removeItem("headerHeight");
      }, 50);
    }

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [location.pathname, scrollToElement]);

  return { handleLinkClick };
};
