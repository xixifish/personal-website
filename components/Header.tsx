import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Jing Chen
      </Link>
      <nav aria-label="Main">
        {/* About, Projects, Design and Library come back when they have their own pages */}
        <ul className={styles.list}>
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
