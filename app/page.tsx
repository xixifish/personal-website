import styles from "./page.module.css";
import Image from "next/image";
import { Divider } from "@/components/Divider";
import { ContactCard } from "@/components/ContactCard";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/avatar.jpg"
          alt=""
          width={80}
          height={80}
          className={styles.avatar}
        />
        <h1 className={styles.name}>Jing Chen</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.intro}>
          <p>
            Welcome, I’m Jing, living in Sydney and finishing my Master of IT at
            UNSW soon. I used to work as a product designer for five years.
          </p>
          <p>
            I care about <strong>how a product works</strong> and{" "}
            <strong>how it looks</strong>, and have designed products for many
            businesses in New Zealand and China. Now, I’m looking for a software
            engineering role, in design engineering, frontend or full-stack.
          </p>
        </div>
        <Divider />

        <ContactCard />

        <Divider />
        <section>
          <h2>Recently designed and built:</h2>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Busy updating this website. View the source on{" "}
          <a href="https://github.com/xixifish/personal-website">GitHub</a>. ©
          2026 Jing Chen
        </p>
      </footer>
    </div>
  );
}
