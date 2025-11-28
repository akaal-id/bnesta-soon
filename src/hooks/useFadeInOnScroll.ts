"use client";

import { useEffect, useRef, useState } from "react";

interface UseFadeInOnScrollOptions {
  delay?: number; // Delay in milliseconds before animation starts
  threshold?: number; // Intersection observer threshold (0-1)
  rootMargin?: string; // Root margin for intersection observer
}

export function useFadeInOnScroll<T extends HTMLElement = HTMLElement>(options: UseFadeInOnScrollOptions = {}) {
  const { delay = 0, threshold = 0.1, rootMargin = "0px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay before setting visible
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Unobserve after animation triggers to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  return { elementRef, isVisible };
}

