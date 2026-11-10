import styles from "./ContactCard.module.css";

const CONTACTS = [
  {
    label: "Email",
    href: "mailto:jing.chen.dev@gmail.com",
    text: "jing.chen.dev@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jingchen-dev",
    text: "linkedin.com/in/jingchen-dev",
  },
  {
    label: "GitHub",
    href: "https://github.com/xixifish",
    text: "github.com/xixifish",
  },
];

export function ContactCard() {
  return (
    <section className={styles.contact}>
      <h2 className={styles.heading}>Get in touch:</h2>
      <div className={styles.card}>
        <dl className={styles.list}>
          {CONTACTS.map((contact) => (
            <div key={contact.label} className={styles.row}>
              <dt className={styles.label}>{contact.label}</dt>
              <dd className={styles.value}>
                <a href={contact.href}>{contact.text}</a>
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.bottom}>
          <p className={styles.note}>
            * Full rights to work in AU and NZ. Open to both locations.
          </p>
          <a
            className={styles.downloadCV}
            href="/jing-chen-cv.pdf"
            target="_blank"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}
