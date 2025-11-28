"use client";

import Image from "next/image";
import styles from "./VillaCard.module.css";
import { Villa } from "@/data/villaImages";

interface VillaCardProps {
  villa: Villa;
  priority?: boolean;
}

export function VillaCard({ villa, priority = false }: VillaCardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src={villa.image}
          alt={`${villa.name} villa`}
          fill
          className={styles.slideImage}
          sizes="100vw"
          priority={priority}
          loading={priority ? undefined : "eager"}
        />
        {/* Gradient overlay for text readability */}
        <div className={styles.gradientOverlay} />
        
        {/* Text overlays */}
        <div className={styles.textOverlay}>
          <p className={styles.bedroomType}>{villa.bedroomType}</p>
          <h3 className={styles.villaName}>{villa.name}</h3>
          <div className={styles.description}>
            {villa.description.split(/\.\s+/).filter(sentence => sentence.trim()).map((sentence, index, array) => {
              const trimmedSentence = sentence.trim();
              const hasPeriod = trimmedSentence.endsWith('.');
              return (
                <span key={index}>
                  {trimmedSentence}
                  {!hasPeriod && '.'}
                  {index < array.length - 1 && <br />}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

