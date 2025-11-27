"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import styles from "./SectionIntro.module.css";

const SLIDE_DURATION_MS = 5000; // 5 seconds

const backgroundImages = [
  "/images/front1.png",
  "/images/front2.png",
] as const;

// Metadata for SectionIntro
const sectionMetadata = {
  title: "BNesta Bali - A Quiet Retreat for a Steady Reset",
  description:
    "BNesta is a private villa retreat in Kerobokan, designed for emotional recovery, spatial comfort, and daily habits. Stay in stillness. Reset in rhythm.",
};

export function SectionIntro() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = backgroundImages.length;
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const parallaxInstancesRef = useRef<any[]>([]);

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

  // Initialize parallax effect
  useEffect(() => {
    // Clean up existing parallax instances
    parallaxInstancesRef.current.forEach((instance) => {
      if (instance && typeof instance.destroy === "function") {
        instance.destroy();
      }
    });
    parallaxInstancesRef.current = [];

    // Wait for images to be rendered, then initialize parallax
    const timeoutId = setTimeout(async () => {
      if (imageWrapperRef.current) {
        // Dynamically import SimpleParallax only in the browser
        // @ts-ignore - simple-parallax-js/vanilla doesn't have type definitions
        const SimpleParallax = (await import("simple-parallax-js/vanilla")).default;
        
        // Query for img elements within the container (Next.js Image renders as img)
        const imgElements = imageWrapperRef.current.querySelectorAll(
          "img"
        ) as NodeListOf<HTMLImageElement>;

        imgElements.forEach((imgElement) => {
          if (imgElement) {
            const parallax = new SimpleParallax(imgElement, {
              orientation: "up",
              scale: 1.2,
              delay: 4,
            });
            parallaxInstancesRef.current.push(parallax);
          }
        });
      }
    }, 100); // Small delay to ensure images are rendered

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      parallaxInstancesRef.current.forEach((instance) => {
        if (instance && typeof instance.destroy === "function") {
          instance.destroy();
        }
      });
      parallaxInstancesRef.current = [];
    };
  }, [currentIndex]); // Re-initialize when slide changes

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
    <section className={styles.intro}>
      {/* Container 1: Image Carousel */}
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper} ref={emblaRef}>
          <div className={styles.emblaContainer} ref={imageWrapperRef}>
            {backgroundImages.map((image, index) => (
              <div key={image} className={styles.emblaSlide}>
                <Image
                  src={image}
                  alt="BNesta villa"
                  fill
                  className={styles.slideImage}
                  priority={index === 0}
                  sizes="(max-width: 1440px) 100vw, 1440px"
                />
              </div>
            ))}
          </div>
          {/* Image Navigation */}
          <div className={styles.imgNav}>
            {backgroundImages.map((_, index) => (
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

      {/* Container 2: Title */}
      <div className={styles.titleContainer}>
        <p className={styles.eyebrow}>BNESTA BALI</p>
        <h2 className={styles.heading}>A Quiet Retreat for a Steady Reset.</h2>
      </div>

      {/* Container 3: Content with three columns */}
      <div className={styles.contentContainer}>
        <div className={styles.column}>
          <span className={styles.description}>
            BNesta is a private villa retreat in Kerobokan, designed for
            emotional recovery, spatial comfort, and daily habits.{" "}
            <span className={styles.highlight}>
              Shaped around light, texture, and calm, each villa helps you return to a
              steady rhythm with ease.
            </span>
          </span>
        </div>

        <div className={styles.column}>
          <p className={styles.description}>
            The neighborhood is peaceful, and each villa supports slow routines,
            clear thinking, and privacy.{" "}
            <span className={styles.highlight}>
              The atmosphere is warm and grounded,
              designed for natural rest.
            </span>
          </p>
        </div>

        <div className={styles.column}>
          <p className={styles.description}>
            BNesta has five villas, each with its own theme, so you can choose
            a mood. Before you arrive, we'll send a preference form to make
            the space {" "}
            <span className={styles.highlight}>
              feel familiar from the first moment.
            </span>
          </p>
        </div>
      </div>

      {/* Container 4: Bottom Text */}
      <div className={styles.bottomContainer}>
        <p className={styles.closing}>Stay in stillness. Reset in rhythm.</p>
        <p className={styles.opening}>BNesta is opening soon.</p>
      </div>
    </section>
  );
}