import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = true
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, inView };
};

export default useIntersectionObserver;