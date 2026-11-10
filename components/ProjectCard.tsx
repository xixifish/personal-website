import type { Project } from "@/data/projects";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.project}>
      <a href={project.liveUrl} className={styles.coverLink}>
        <Image
          src={project.cover.src}
          sizes="(max-width: 600px) 100vw, 560px"
          width={560}
          height={270}
          alt={project.cover.alt}
          className={styles.cover}
        />
      </a>
      <h3 className={styles.name}>{project.name}: </h3>
      <p className={styles.tagline}>{project.tagline}</p>
      <ul className={styles.links}>
        <li>
          <a href={project.liveUrl}>
            Try it
            <span className="visually-hidden">{` ${project.name}`}</span>
          </a>
        </li>
        <li>
          <a href={project.githubUrl}>
            GitHub
            <span className="visually-hidden">{` ${project.name}`}</span>
          </a>
        </li>
        <li>
          <a href={project.figmaUrl}>
            Figma
            <span className="visually-hidden">{` ${project.name}`}</span>
          </a>
        </li>
      </ul>
    </article>
  );
}
