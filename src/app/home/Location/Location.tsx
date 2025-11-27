import styles from "./Location.module.css";
import buttonStyles from "@/components/Button/Button.module.css";

export function Location() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrapper}>
        <iframe
          className={styles.mapFrame}
          title="BNesta Location Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=Jl.+Tunjung+I,+Kerobokan+Kelod,+Kec.+Kuta+Utara,+Kabupaten+Badung,+Bali+80117&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Our Location</p>
        <h4 className={styles.title}>Kerobokan, Bali</h4>
        <span className={styles.divider} />
        <p>
        Jl. Tunjung I, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80117
        </p>
        <a className={buttonStyles.outlineButton} href="#">
          See Detail →
        </a>
      </div>
    </section>
  );
}