"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Profile.module.css";
import { VillaCard } from "@/components/VillaCard/VillaCard";
import { villaData } from "@/data/villaImages";

const SLIDE_DURATION_MS = 5000; // 5 seconds

export function Profile() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = villaData.length;
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Start/reset auto-play timer
  const startAutoPlay = useCallback(() => {
    if (!emblaApi) return;

    // Clear existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Start new interval
    autoPlayIntervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, SLIDE_DURATION_MS);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    startAutoPlay();

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [emblaApi, startAutoPlay]);

  // Handle indicator click
  const handleIndicatorClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      // Only navigate if clicking a different index
      if (index !== currentIndex) {
        emblaApi.scrollTo(index);
        // Reset the timer when clicking
        startAutoPlay();
      }
    },
    [emblaApi, currentIndex, startAutoPlay]
  );

  return (
    <section className={styles.section}>
      {/* Container 1: Title */}
      <div className={styles.titleContainer}>
        <p className={styles.eyebrow}>YOUR HAVEN IS ALMOST THERE</p>
        <h2 className={styles.heading}>
          Five Villas, 
          <strong> Five Atmospheres</strong>
        </h2>
      </div>

      {/* Container 2: Image Carousel */}
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {villaData.map((villa, index) => (
              <div key={villa.id} className={styles.emblaSlide}>
                <VillaCard villa={villa} priority={index === 0} />
              </div>
            ))}
          </div>
          {/* Image Navigation */}
          <div className={styles.imgNav}>
            {villaData.map((_, index) => (
              <div
                key={index}
                className={
                  index === currentIndex
                    ? styles.imgNavActive
                    : styles.imgNavIdle
                }
                onClick={() => handleIndicatorClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleIndicatorClick(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Container 3: Description */}
      <div className={styles.descriptionContainer}>
        <div className={styles.textGrid}>
          <p className={styles.description}>
            BNesta reflects Bali's natural character through wood, stone, and
            soft neutral tones. These elements create a warm and grounded
            atmosphere that feels familiar and easy.
          </p>
          <p className={styles.description}>
            Large windows bring daylight into each villa, keeping the space
            bright and calm throughout the day. The design reduces visual noise,
            helping guests settle into a steady, comfortable rhythm.
          </p>
        </div>
      </div>
    </section>
  );
}
