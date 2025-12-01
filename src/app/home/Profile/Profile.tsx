"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./Profile.module.css";
import { VillaCard } from "@/components/VillaCard/VillaCard";
import { villaData } from "@/data/villaImages";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

const SLIDE_DURATION_MS = 5000; // 5 seconds

export function Profile() {
  const { elementRef: titleContainerRef, isVisible: titleContainerVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 0 });
  const { elementRef: imageContainerRef, isVisible: imageContainerVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 150 });
  const { elementRef: catalogContainerRef, isVisible: catalogContainerVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 200 });
  const { elementRef: descriptionContainerRef, isVisible: descriptionContainerVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 300 });
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Main Carousel navigation
  const scrollMainPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      startAutoPlay(); // Reset timer on manual interaction
    }
  }, [emblaApi]); 

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Start/reset auto-play timer
  const startAutoPlay = useCallback(() => {
    if (!emblaApi) return;
    // Don't start autoplay if modal is open
    if (selectedImage) return;

    // Clear existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    // Start new interval
    autoPlayIntervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, SLIDE_DURATION_MS);
  }, [emblaApi, selectedImage]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  }, []);

  // Main Carousel Navigation Wrappers that also handle autoplay reset
  const handleMainPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      startAutoPlay();
    }
  }, [emblaApi, startAutoPlay]);

  const handleMainNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      startAutoPlay();
    }
  }, [emblaApi, startAutoPlay]);


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

  const openModal = (src: string) => {
    setSelectedImage(src);
    stopAutoPlay();
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Restart autoplay when modal closes
  useEffect(() => {
    if (!selectedImage && emblaApi) {
      startAutoPlay();
    }
  }, [selectedImage, emblaApi, startAutoPlay]);

  return (
    <section className={styles.section}>
      {/* Container 1: Title */}
      <div ref={titleContainerRef} className={`${styles.titleContainer} ${titleContainerVisible ? styles.visible : ""}`}>
        <p className={styles.eyebrow}>YOUR HAVEN IS ALMOST THERE</p>
        <h2 className={styles.heading}>
          Five Villas, 
          <strong> Five Atmospheres</strong>
        </h2>
      </div>

      {/* Container 2: Image Carousel */}
      <div 
        ref={imageContainerRef} 
        className={`${styles.imageContainer} ${imageContainerVisible ? styles.visible : ""}`}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={() => {
          if (!selectedImage) startAutoPlay();
        }}
      >
        <div className={styles.imageWrapper} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {villaData.map((villa, index) => (
              <div key={villa.id} className={styles.emblaSlide}>
                <VillaCard villa={villa} priority={index === 0} />
              </div>
            ))}
          </div>
          
          {/* Main Carousel Navigation Arrows */}
          <button 
            className={`${styles.navButtonMain} ${styles.navButtonMainLeft}`} 
            onClick={handleMainPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            className={`${styles.navButtonMain} ${styles.navButtonMainRight}`} 
            onClick={handleMainNext}
            aria-label="Next slide"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Navigation Dots */}
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

      {/* Container 2.5: Gallery - Static 3 Images */}
      <div 
        ref={catalogContainerRef} 
        className={`${styles.catalogContainer} ${catalogContainerVisible ? styles.visible : ""}`}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={() => {
          if (!selectedImage) startAutoPlay();
        }}
      >
        <div key={currentIndex} className={styles.catalogContent}>
          <div className={styles.catalogHeader}>
            <h3 className={styles.catalogTitle}>
              Another image of Villa {villaData[currentIndex].name}
            </h3>
          </div>

          <div className={styles.catalogGrid}>
            {villaData[currentIndex].gallery.slice(0, 3).map((src, index) => (
              <div 
                key={index} 
                className={styles.catalogItem} 
                onClick={() => openModal(src)}
              >
                <Image
                  src={src}
                  alt={`${villaData[currentIndex].name} gallery image ${index + 1}`}
                  fill
                  className={styles.catalogImage}
                  sizes="(max-width: 768px) 33vw, calc(33.333% - 16px)"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container 3: Description */}
      <div ref={descriptionContainerRef} className={`${styles.descriptionContainer} ${descriptionContainerVisible ? styles.visible : ""}`}>
        <div className={styles.textGrid}>
          <p className={styles.description}>
            Each of BNesta's five villas carries a different theme shaped by light, nature, or texture. <strong>This variety gives guests a sense of choice</strong> while keeping the brand philosophy simple and consistent. Natural materials such as wood and stone keep the villas warm and grounded. Wide windows bring in quiet daylight, and clean lines reduce visual noise so your mind settles easily.
          </p>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={32} color="white" />
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedImage}
                alt="Selected gallery image"
                fill
                className={styles.modalImage}
                quality={100}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
