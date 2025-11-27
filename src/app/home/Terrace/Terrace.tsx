import Image from "next/image";
import styles from "./Terrace.module.css";
import buttonStyles from "@/components/Button/Button.module.css";

const habits = [
  { id: "01", label: "A clearer mind" },
  { id: "02", label: "Light movement" },
  { id: "03", label: "Steady routines" },
  { id: "04", label: "Balanced meals" },
];

export function Terrace() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* --- LEFT COLUMN: Text Content --- */}
        <div className={styles.textColumn}>
          <p className={styles.introText}>
            Designed as a private outdoor sanctuary, the terrace offers a calm
            space for simple daily habits. Guests begin the morning with light
            stretching, read in the open air, or enjoy a quiet breakfast by the
            pool. This space encourages four gentle improvements in daily life:
          </p>

          <div className={styles.list}>
            {habits.map((item) => (
              <div key={item.id} className={styles.item}>
                <span className={styles.number}>{item.id}</span>
                <span className={styles.label}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.footerGroup}>
            <p className={styles.footerText}>
              It is a practical, comfortable setting where slow living feels
              natural.
            </p>
            <button type="button" className={buttonStyles.outlineButton}>
              Discover more
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Title & Image --- */}
        <div className={styles.imageColumn}>
          <div className={styles.details}>
            <p className={styles.eyebrow}> outdoor sanctuary </p>
            <h3 className={styles.title}>
              A Quiet Retreat <br /> for Better Living
            </h3>
          </div>

          <div className={styles.mainMedia}>
            <Image
              src="/images/Terrace-1.jpg"
              alt="Featured Villa Matahari"
              width={576}
              height={720}
              sizes="(max-width: 900px) 100vw, 60vw"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}