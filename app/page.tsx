import styles from "./page.module.css";
import { Divider } from "@/components/Divider";
import { ContactCard } from "@/components/ContactCard";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
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
          UNSW soon. I used to work as a product designer for five years. I care
          about <mark>how a product works</mark> and <mark>how it looks</mark>,
          and have designed products for many businesses in New Zealand and
          China. Now, I’m looking for a software engineering role, in design
          engineering, frontend or full-stack.
        </p>
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
