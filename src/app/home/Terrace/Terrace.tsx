"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Terrace.module.css";
import buttonStyles from "@/components/Button/Button.module.css";

const habits = [
  {
    id: "01",
    label: "Mindful nourishment",
    description: "A Morning Ritual Corner encourages a slow start with tea, hydration, and gentle prompts. Guests explore nearby wellness cafés at their own pace.",
  },
  {
    id: "02",
    label: "Movement without pressure",
    description: "Yoga tools, terraces, garden paths, and private pools support light, natural activity throughout the day.",
  },
  {
    id: "03",
    label: "Daily stillness",
    description: "Journaling tools, quiet corners, and BNesta Audio Moments invite short pauses that clear the mind.",
  },
  {
    id: "04",
    label: "Balanced rhythm",
    description: "Lighting, scent, and sound shift through the day to support rest. Sleep-focused design and premium bedding create natural comfort at night.",
  },
];

export function Terrace() {
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
      <div className={styles.container}>
        
        {/* --- LEFT COLUMN: Text Content --- */}
        <div className={styles.textColumn}>
          <p className={styles.introText}>
            BNesta is shaped to help guests naturally restore{" "}
            <strong>four simple daily habits</strong>. These habits unfold through
            light, movement, and quiet routines built into each villa.
          </p>

          <div className={styles.listContainer}>
            {/* Top Container: Items 1-2 */}
            <div className={styles.listRow}>
              <div className={styles.itemLeft}>
                <div className={styles.item}>
                  <span className={styles.number}>{habits[0].id}</span>
                  <div className={styles.labelContainer}>
                    <span className={styles.label}>{habits[0].label}</span>
                    <span className={styles.description}>{habits[0].description}</span>
                  </div>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.item}>
                  <span className={styles.number}>{habits[1].id}</span>
                  <div className={styles.labelContainer}>
                    <span className={styles.label}>{habits[1].label}</span>
                    <span className={styles.description}>{habits[1].description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Container: Items 3-4 */}
            <div className={styles.listRow}>
              <div className={styles.itemLeft}>
                <div className={styles.item}>
                  <span className={styles.number}>{habits[2].id}</span>
                  <div className={styles.labelContainer}>
                    <span className={styles.label}>{habits[2].label}</span>
                    <span className={styles.description}>{habits[2].description}</span>
                  </div>
                </div>
              </div>
              <div className={styles.itemRight}>
                <div className={styles.item}>
                  <span className={styles.number}>{habits[3].id}</span>
                  <div className={styles.labelContainer}>
                    <span className={styles.label}>{habits[3].label}</span>
                    <span className={styles.description}>{habits[3].description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerGroup}>
            <p className={styles.footerText}>
              At BNesta, rhythm returns through <strong>space, not instruction</strong>.
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Title & Image --- */}
        <div className={styles.imageColumn}>
          <div className={styles.details}>
            <p className={styles.eyebrow}> outdoor sanctuary </p>
            <h3 className={styles.title}>
              A Space That Restores <br /> Your Daily Rhythm
            </h3>
          </div>

          <div className={styles.mainMedia} ref={imageWrapperRef}>
            <Image
              src="/images/pool1.png"
              alt="BNesta outdoor sanctuary"
              width={576}
              height={720}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
              className={styles.image}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
