import Image from "next/image";
import styles from "./Profile.module.css";
import buttonStyles from "@/components/Button/Button.module.css";

export function Profile() {
  return (
    <section className={styles.section}>
      {/* 1. Top Image Section */}
      <div className={styles.imageContainer}>
        <Image
          src="/images/Profile-1.jpg" // Ganti dengan path image interior kamu
          alt="BNesta Interior Design Philosophy"
          width={1280}
          height={720}
          className={styles.image}
          priority
        />
      </div>

      {/* 2. Content Section */}
      <div className={styles.content}>
        
        {/* Header Group: Line + Eyebrow */}
        <div className={styles.headerGroup}>
          <span className={styles.line} />
          <span className={styles.eyebrow}>Design Philosophy</span>
        </div>

        {/* Main Heading */}
        <h2 className={styles.heading}>
          Where <strong>Local Warmth</strong> Meets <br />
          Modern Calm.
        </h2>

        {/* 2-Column Text Description */}
        <div className={styles.textGrid}>
          <p className={styles.description}>
            BNesta reflects Bali’s natural character through wood, stone, and
            soft neutral tones. These elements create a warm and grounded
            atmosphere that feels familiar and easy.
          </p>
          <p className={styles.description}>
            Large windows bring daylight into each villa, keeping the space
            bright and calm throughout the day. The design reduces visual noise,
            helping guests settle into a steady, comfortable rhythm.
          </p>
        </div>

        {/* Bottom Button */}
        <div className={styles.actionWrapper}>
          <button type="button" className={buttonStyles.outlineButton}>
            Discover more
          </button>
        </div>
      </div>
    </section>
  );
}