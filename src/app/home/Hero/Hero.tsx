"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./Hero.module.css";
import { EmailForm } from "@/components/EmailForm/EmailForm";

const SLIDE_DURATION_MS = 3000;

const backgroundImages = [
  "/images/20251118_BVilla Interior_페이지_19_이미지_0002.webp",
  "/images/20251118_BVilla Interior_페이지_26_이미지_0002.webp",
  "/images/20251118_BVilla Interior_페이지_36_이미지_0002.webp",
  "/images/20251118_BVilla Interior_페이지_46_이미지_0002.webp",
  "/images/villa/alaswarna1.webp",
  "/images/villa/cahaya1.webp",
  "/images/front2.webp",
  "/images/villa/mahakarya1.webp",
  "/images/pool1.webp",
  "/images/villa/Matahari1.webp",
  "/images/yoga1.webp",
  "/images/villa/svarga1.webp"
  
] as const;

export function Hero() {
  const slides = useMemo(() => backgroundImages.filter(Boolean), []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])); // First image is considered loaded
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  // Load first image immediately and start animations
  useEffect(() => {
    const firstImage = new window.Image();
    firstImage.onload = () => {
      setIsReady(true);
      setLoadedImages(new Set([0]));
    };
    firstImage.onerror = () => {
      // Even if first image fails, show the section
      setIsReady(true);
      setLoadedImages(new Set([0]));
    };
    firstImage.src = slides[0];
  }, [slides]);

  // Preload next image(s) as slider progresses
  useEffect(() => {
    if (!isReady || slides.length < 2) return;

    // Preload current, next, and next+1 images
    const imagesToPreload = [
      currentSlide,
      (currentSlide + 1) % slides.length,
      (currentSlide + 2) % slides.length,
    ];

    imagesToPreload.forEach((index) => {
      if (!loadedImages.has(index)) {
        const img = new window.Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]));
        };
        img.src = slides[index];
      }
    });
  }, [currentSlide, isReady, slides, loadedImages]);

  // Start slider once first image is ready
  useEffect(() => {
    if (slides.length < 2 || !isReady) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [slides.length, isReady]);

  useEffect(() => {
    if (!isReady) return;

    const animateText = async () => {
      try {
        const { animate, splitText } = await import("animejs");
        
        if (animate && splitText) {
          // Split and animate eyebrow
          if (eyebrowRef.current) {
            const eyebrowSplit = splitText(eyebrowRef.current, { words: true });
            if (eyebrowSplit.words) {
              animate(eyebrowSplit.words, {
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 1000,
                delay: (el, i) => 300 + i * 50,
                easing: "easeOutExpo",
              });
            }
          }

          // Split and animate headline
          if (headlineRef.current) {
            const headlineSplit = splitText(headlineRef.current, { words: true });
            if (headlineSplit.words) {
              animate(headlineSplit.words, {
                opacity: [0, 1],
                translateY: [0, 0],
                duration: 2000,
                delay: (el, i) => 600 + i * 80,
                easing: "easeOutExpo",
              });
            }
          }

          // Split and animate subhead
          if (subheadRef.current) {
            const subheadSplit = splitText(subheadRef.current, { words: true });
            if (subheadSplit.words) {
              animate(subheadSplit.words, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 1000,
                delay: (el, i) => 1200 + i * 60,
                easing: "easeOutExpo",
              });
            }
          }
        } else {
          // Fallback: show text without animation
          if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
          if (headlineRef.current) headlineRef.current.style.opacity = "1";
          if (subheadRef.current) subheadRef.current.style.opacity = "1";
        }
      } catch (error) {
        console.error("Animation error:", error);
        // Fallback: show text without animation
        if (eyebrowRef.current) eyebrowRef.current.style.opacity = "1";
        if (headlineRef.current) headlineRef.current.style.opacity = "1";
        if (subheadRef.current) subheadRef.current.style.opacity = "1";
      }
    };

    animateText();
  }, [isReady]);

  return (
    <section className={`${styles.hero} ${isReady ? styles.ready : ""}`}>
      {slides.map((image, index) => {
        // Always render first image, and render current/next/previous slides
        // Other images will be rendered as they're preloaded
        const isFirstImage = index === 0;
        const isCurrent = index === currentSlide;
        const isNext = index === (currentSlide + 1) % slides.length;
        const isPrevious = index === (currentSlide - 1 + slides.length) % slides.length;
        const isLoaded = loadedImages.has(index);
        
        const shouldRender = isFirstImage || isCurrent || isNext || isPrevious || isLoaded;

        if (!shouldRender) return null;

        return (
          <img
            key={image}
            src={image}
            alt=""
            className={`${styles.slideImage} ${
              isCurrent ? styles.active : ""
            }`}
            loading={isFirstImage ? "eager" : "lazy"}
          />
        );
      })}
      <div className={styles.topGradient} />

      <div className={styles.grid}>
        <div className={`${styles.slot} ${styles.brandSlot}`}>
          <div className={styles.brandIcon}>
            <Image
              src="/images/logo/vertical.png"
              alt="BNesta monogram"
              fill
              sizes="160px"
              quality={100}
              className={styles.brandImage}
            />
          </div>
          <p ref={eyebrowRef} className={styles.eyebrow}>
            Kerobokan, Bali
          </p>
        </div>

        <div className={`${styles.slot} ${styles.centerSlot}`}>
          <h1 ref={headlineRef} className={styles.headline}>
          Private calm.             
          </h1>
          <h1 ref={headlineRef} className={styles.headline}>
          Simple living.            
          </h1>
          <p ref={subheadRef} className={styles.subhead}>
            
            Will Open in 2026
          </p>
        </div>

        <div className={`${styles.slot} ${styles.signupSlot}`}>
          <div className={styles.signupContent}>
            <p className={styles.signupEyebrow}>
              Stay updated on the exciting moment when BNesta is ready to
              welcome you!
            </p>
            <EmailForm
              placeholder="Enter your email"
              buttonLabel="→"
              className={styles.signupForm}
              inputClassName={styles.emailInput}
              buttonClassName={styles.submitButton}
            />
          </div>
        </div>
      </div>
    </section>
  );
}