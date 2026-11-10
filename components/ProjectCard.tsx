import type { Project } from "@/data/projects";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
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
      <h3>{project.name}:</h3>
      <p>{project.tagline}</p>
      <ul>
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
