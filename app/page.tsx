import styles from "./page.module.css";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { DESIGNCASES } from "@/data/designCases";
import { LIBRARY } from "@/data/library";
import Image from "next/image";
import { CopyEmail } from "@/components/CopyEmail";

const EMAIL = "jing.chen.dev@gmail.com";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroSection}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroText}>
              I design products, then I build them.
            </h1>
            <Image
              width={90}
              height={90}
              src="/avatar.jpg"
              alt="Portrait of Jing Chen"
              className={styles.avatar}
            />
          </div>
          <p className={styles.intro}>
            Welcome, I’m Jing, living in Sydney and finishing my Master of IT at
            UNSW soon. I used to work as a product designer for five years. I
            care about <mark>how a product works</mark> and{" "}
            <mark>how it looks</mark>, and have designed products for many
            businesses in New Zealand and China. Now, I’m looking for a software
            engineering role, in design engineering, frontend or full-stack.
          </p>
          <address className={styles.contact}>
            <div className={styles.emailButtons}>
              <a href={`mailto:${EMAIL}`} className={styles.email}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14.6667 4.66675L8.67266 8.48475C8.46926 8.60289 8.23822 8.66512 8.00299 8.66512C7.76777 8.66512 7.53673 8.60289 7.33333 8.48475L1.33333 4.66675" />
                  <path d="M2.66666 2.66675H13.3333C14.0697 2.66675 14.6667 3.2637 14.6667 4.00008V12.0001C14.6667 12.7365 14.0697 13.3334 13.3333 13.3334H2.66666C1.93028 13.3334 1.33333 12.7365 1.33333 12.0001V4.00008C1.33333 3.2637 1.93028 2.66675 2.66666 2.66675Z" />
                </svg>
                {EMAIL}
              </a>
              <CopyEmail email={EMAIL} />
            </div>
            <div className={styles.linkLocation}>
              <a href="https://www.linkedin.com/in/jingchen-dev">LinkedIn</a>
              <p className={styles.location}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.3334 6.66659C13.3334 9.99525 9.64069 13.4619 8.40069 14.5326C8.28517 14.6194 8.14455 14.6664 8.00002 14.6664C7.85549 14.6664 7.71487 14.6194 7.59935 14.5326C6.35935 13.4619 2.66669 9.99525 2.66669 6.66659C2.66669 5.2521 3.22859 3.89554 4.22878 2.89535C5.22898 1.89516 6.58553 1.33325 8.00002 1.33325C9.41451 1.33325 10.7711 1.89516 11.7713 2.89535C12.7715 3.89554 13.3334 5.2521 13.3334 6.66659Z" />
                  <path d="M10 6.66675C10 7.77132 9.10457 8.66675 8 8.66675C6.89543 8.66675 6 7.77132 6 6.66675C6 5.56218 6.89543 4.66675 8 4.66675C9.10457 4.66675 10 5.56218 10 6.66675Z" />
                </svg>
                Sydney · Open to NZ and remote
              </p>
            </div>
          </address>
        </div>
        <section className={styles.section}>
          <h2>Projects</h2>
          <p className={styles.sectionIntro}>
            Alongside my studies, I built two apps, and I’m using and improving
            them every week.
          </p>
          <div className={styles.projectList}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <h2>Design</h2>
          <p className={styles.sectionIntro}>
            I aim to deliver simple, elegant solutions that address real user
            needs while achieving business goals.
          </p>
          <ul className={styles.designList}>
            {DESIGNCASES.map((designCase) => (
              <li key={designCase.title} className={styles.designRow}>
                <span>{designCase.title}</span>
                <span>{designCase.client}</span>
                <span>{designCase.result}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <h2>Library</h2>
          <p className={styles.sectionIntro}>
            In my spare time, I read books and Japanese manga, and watch films
            and TV shows. They’re where many of my ideas come from. Here are the
            recent ones.
          </p>
          <ul className={styles.libraryList}>
            {LIBRARY.slice(0, 7).map((item) => (
              <li key={item.title} className={styles.libraryItem}>
                <Image
                  src={item.cover}
                  width={108}
                  height={162}
                  sizes="108px"
                  alt={item.title}
                  className={styles.libraryCover}
                />
                <p className={styles.libraryMonth}>{item.month}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          Busy updating this website. View the source on{" "}
          <a href="https://github.com/xixifish/personal-website">GitHub</a>.
        </p>
        <p>© 2026 Jing Chen</p>
      </footer>
    </div>
  );
}
