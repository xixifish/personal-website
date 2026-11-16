export type LibraryItem = {
  title: string;
  type: "book" | "manga" | "film" | "tv";
  month: string; // when I read or watched it, e.g. "Nov 2026"
  cover: string; // path from public/, e.g. "/library/slow-horses.jpg"
  isbn?: string; // books and manga (the volume shown on the cover)
  tmdbId?: number; // films and TV shows, from themoviedb.org
};

// Newest first. The home page shows the first 7.
export const LIBRARY: LibraryItem[] = [
  {
    title: "A Mind for Numbers",
    type: "book",
    month: "Nov 2026",
    cover: "/library/a-mind-for-numbers.jpg",
  },
  {
    title: "For All Mankind",
    type: "tv",
    month: "Oct 2026",
    cover: "/library/for-all-mankind.jpg",
  },
  {
    title: "Vagabond, Vol. 3",
    type: "manga",
    month: "Oct 2026",
    cover: "/library/vagabond-3.jpg",
  },
  {
    title: "Lee Kuan Yew: Hard Truths to Keep Singapore Going",
    type: "book",
    month: "Sep 2026",
    cover: "/library/lee-kuan-yew-hard-truths.jpg",
  },
  {
    title: "Slow Horses",
    type: "tv",
    month: "Sep 2026",
    cover: "/library/slow-horses.jpg",
  },
  {
    title: "Tシャツが乾くまで",
    type: "tv",
    month: "Sep 2026",
    cover: "/library/t-shirt-ga-kawaku-made.jpg",
  },
  {
    title: "Dorohedoro, Vol. 23",
    type: "manga",
    month: "Sep 2026",
    cover: "/library/dorohedoro-23.jpg",
  },
];
