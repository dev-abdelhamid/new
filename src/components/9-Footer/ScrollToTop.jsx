import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`p-3 rounded-full 
        bg-gradient-to-r from-blue-500 to-blue-600 text-white 
        shadow-lg transition-all duration-300 transform 
        hover:scale-110 hover:shadow-blue-500/50 
        active:scale-95 scroll-button-pulse
        ${showScroll ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
