import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Jing Chen
      </Link>
      <nav aria-label="Main">
        <ul className={styles.list}>
          <li>
            <Link href="/" aria-current="page" className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link href="/#projects" className={styles.link}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/#design" className={styles.link}>
              Design
            </Link>
          </li>
          <li>
            <Link href="/#library" className={styles.link}>
              Library
            </Link>
          </li>
          <li>
            <a href="/jingchen-cv.pdf" target="_blank" className={styles.link}>
              Resume{" "}
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
