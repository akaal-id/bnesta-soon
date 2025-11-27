import Image from "next/image";
import styles from "./CommonSpaces.module.css";

const spaces = [
  {
    title: "Spa & Wellness",
    description:
      "Dedicated rooms for guided breathwork, massage, and restorative spa rituals curated by BLife therapists.",
    image: "/images/villa-2.jpg",
    width: 1200,
    height: 1200,
  },
  {
    title: "Co-working Studio",
    description:
      "Acoustically balanced spaces with natural light, perfect for mindful productivity and intimate workshops.",
    image: "/images/villa-3.jpg",
    width: 940,
    height: 705,
  },
  {
    title: "Surf & Shoreline",
    description:
      "Sunrise surf mentoring at Batu Bolong, followed by grounding tea ceremonies back at the villa.",
    image: "/images/villa-1.jpg",
    width: 1132,
    height: 1649,
  },
  {
    title: "Gathering Table",
    description:
      "Chef-led communal dining where nourishment is slow, seasonal, and deeply connective.",
    image: "/images/story.png",
    width: 2910,
    height: 1722,
  },
];

export function CommonSpaces() {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.stickyCol}>
          <h4 className={styles.heading}>
            Explore the vibrant{" "}
            <em>Common Spaces of BNesta Villas</em>
          </h4>
          <p>
            Discover lively communal areas where thoughtful design and
            comfort create the perfect atmosphere for restoring energy and
            meaningful connection.
          </p>
          <a className={styles.link} href="#">
            Explore More →
          </a>
        </div>

        <div className={styles.grid}>
          {spaces.map((space) => (
            <article key={space.title} className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={space.image}
                  alt={space.title}
                  width={space.width}
                  height={space.height}
                />
              </div>
              <div>
                <h5 className={styles.title}>{space.title}</h5>
                <p>{space.description}</p>
                <a className={styles.metaLink} href="#">
                  See Detail →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

