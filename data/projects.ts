export type Project = {
  name: string;
  tagline: string;
  liveUrl: string;
  githubUrl: string;
  figmaUrl: string;
  cover: { src: string; alt: string };
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "Weekly Planner",
    tagline:
      "A full-stack app that makes planning one-off and repeating tasks across the week much easier.",
    liveUrl: "https://weekly-planner-jing.vercel.app/",
    githubUrl: "https://github.com/xixifish/weekly-planner",
    figmaUrl:
      "https://www.figma.com/design/PMOiVwojpmtcMso4lWKBma/weekly-planner?node-id=56-1821&t=MXhWDyzFIBZkF6id-1",
    cover: {
      src: "/covers/cover-1.png",
      alt: "Open Weekly Planner",
    },
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth"],
  },
  {
    name: "Popcorn",
    tagline:
      "A film recommender that runs a language model in the browser to quickly find a film that suits your taste.",
    liveUrl: "https://popcorn-jing.vercel.app/",
    githubUrl: "https://github.com/xixifish/movie-recommender",
    figmaUrl:
      "https://www.figma.com/design/moBbyis5f87CvI4eKIdd2e/movie-recommender?node-id=273-2270",
    cover: {
      src: "/covers/cover-2.png",
      alt: "Open Popcorn Movie Recommender",
    },
    stack: ["React", "Vite", "Transformers.js", "TMDB API"],
  },
];
