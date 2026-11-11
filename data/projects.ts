export type Project = {
  name: string;
  tagline: string;
  liveUrl: string;
  githubUrl: string;
  figmaUrl: string;
  cover: { src: string; alt: string };
};

export const PROJECTS: Project[] = [
  {
    name: "Weekly Planner",
    tagline:
      "Makes repeating and tracking tasks much easier. Try it as a guest, no sign-in needed.",
    liveUrl: "https://weekly-planner-jing.vercel.app/",
    githubUrl: "https://github.com/xixifish/weekly-planner",
    figmaUrl:
      "https://www.figma.com/design/PMOiVwojpmtcMso4lWKBma/weekly-planner?node-id=56-1821&t=MXhWDyzFIBZkF6id-1",
    cover: {
      src: "/covers/cover-1.jpg",
      alt: "Open Weekly Planner",
    },
  },
  {
    name: "Popcorn Movie Recommender",
    tagline: "Finds a movie to your taste quickly.",
    liveUrl: "https://popcorn-jing.vercel.app/",
    githubUrl: "https://github.com/xixifish/movie-recommender",
    figmaUrl:
      "https://www.figma.com/design/moBbyis5f87CvI4eKIdd2e/movie-recommender?node-id=273-2270",
    cover: {
      src: "/covers/cover-2.jpg",
      alt: "Open Popcorn Movie Recommender",
    },
  },
];
