import { RefObject, useCallback, useEffect } from 'react';

export default function useIntersectionObserver(
  elementRef: RefObject<Element>,
  elementType = 'svg',
  removeClass = ['animate-slideOutRight'],
  addClass = ['animate-slideInLeft']
): IntersectionObserverEntry | undefined {
  const animateImg = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(...addClass);
          entry.target.classList.remove('opacity-0', ...removeClass);
        } else {
          entry.target.classList.add(...removeClass);
          entry.target.classList.remove(...addClass);
        }
      });
    },
    [addClass, removeClass]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };
    const nodes = elementRef?.current?.querySelectorAll(elementType);
    const observer = new IntersectionObserver(animateImg, options);
    if (nodes) {
      nodes.forEach((node) => observer.observe(node));
    }
    return () => observer.disconnect();
  }, [elementRef, animateImg, elementType]);

  return;
}
