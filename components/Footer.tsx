import styles from "./Footer.module.css";
import { ContactForm } from "./ContactForm";
import { BrickCanvas } from "./BrickCanvas";
import { EMAIL } from "@/data/contact";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <BrickCanvas />
      <div className={styles.wrapper}>
        <h2>Thank you for visiting.</h2>
        <p className={styles.intro}>
          Interested in my work, or have a question? Send me a message, or email
          me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <ContactForm />
        <p className={styles.bottom}>
          Source on{" "}
          <a href="https://github.com/xixifish/personal-website">GitHub</a> ©
          2026 Jing Chen
        </p>
      </div>
    </footer>
  );
}
