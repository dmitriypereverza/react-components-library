import React from "react";

export default function useIntersectionObserver(threshold = 0.01) {
  const observerRef = React.useRef<IntersectionObserver>(null);
  const [visible, setVisible] = React.useState(true);

  const intersectionRef = (ref: HTMLElement) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!ref) return;
    observerRef.current = new IntersectionObserver(
      function([entity]) {
        setVisible(entity.isIntersecting);
      },
      {
        threshold,
      },
    );
    observerRef.current.observe(ref);
  };

  return { visible, intersectionRef };
}
