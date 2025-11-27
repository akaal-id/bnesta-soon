"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./CommonSpaces.module.css";

export function CommonSpaces() {
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const parallaxInstancesRef = useRef<any[]>([]);

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
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        {/* Left: Large Image */}
        <div className={styles.imageColumn}>
          <div className={styles.mainMedia} ref={imageWrapperRef}>
            <Image
              src="/images/yoga1.png"
              alt="Yoga and meditation studio at BNesta"
              width={1200}
              height={800}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
              className={styles.image}
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className={styles.textColumn}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>THE EXPERIENCE</p>
            <h2 className={styles.title}>Effortless, Private Living</h2>
            <div className={styles.divider}></div>
            
            <div className={styles.textColumns}>
              <div className={styles.textColumnLeft}>
                <p>
                  The BNesta experience feels quiet and intuitive. Check in is smooth, guidance is digital, and the villa responds softly to your presence. Lighting adjusts as the day changes, scent stays gentle, and the atmosphere remains calm without effort. The space is planned to reduce noise, visual clutter, and unnecessary movement so your mind stays clear.
                </p>
              </div>
              <div className={styles.textColumnRight}>
                <p>
                  Inside the villa, comfort is arranged with care. Premium bedding supports deep rest, while hands-free controls allow you to shape the environment with simple voice commands. Preferences prepared before arrival make the stay feel personal and familiar from the start. Service steps back, privacy stays at the center, and the villa becomes a place where you can live lightly and reconnect with yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

