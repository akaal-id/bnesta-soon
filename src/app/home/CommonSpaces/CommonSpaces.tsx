"use client";

import Image from "next/image";
import styles from "./CommonSpaces.module.css";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export function CommonSpaces() {
  const { elementRef: imageColumnRef, isVisible: imageColumnVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 0 });
  const { elementRef: textColumnRef, isVisible: textColumnVisible } = useFadeInOnScroll<HTMLDivElement>({ delay: 200 });

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        {/* Left: Large Image */}
        <div ref={imageColumnRef} className={`${styles.imageColumn} ${imageColumnVisible ? styles.visible : ""}`}>
          <div className={styles.mainMedia}>
            <Image
              src="/images/yoga1.webp"
              alt="Yoga and meditation studio at BNesta"
              width={1200}
              height={800}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
              quality={95}
              className={styles.image}
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div ref={textColumnRef} className={`${styles.textColumn} ${textColumnVisible ? styles.visible : ""}`}>
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

