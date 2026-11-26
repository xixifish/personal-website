import type { Project } from "@/data/projects";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <a href={project.liveUrl} className={styles.coverLink}>
        <Image
          src={project.cover.src}
          sizes="(max-width: 700px) 100vw, 435px"
          width={435}
          height={365}
          alt={project.cover.alt}
          className={styles.cover}
        />
      </a>
      <h3 className={styles.name}>{project.name}</h3>
      <ul className={styles.stack}>
        {project.stack.map((tech) => (
          <li key={tech} className={styles.tech}>
            {tech}
          </li>
        ))}
      </ul>
      <p className={styles.tagline}>{project.tagline}</p>
      <ul className={styles.links}>
        <li>
          <a href={project.liveUrl} className={styles.live}>
            Try it
            <span className="visually-hidden">{` ${project.name}`}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M5.83333 5.83325H14.1667V14.1666" />
              <path d="M5.83333 14.1666L14.1667 5.83325" />
            </svg>
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
