export type DesignCase = {
  title: string;
  client: string;
  result: string;
  slug: string;
  sector: string;
  role: string;
  year: string;
  summary: string;
};

// Cases that have an article in content/design/<slug>.mdx.
// Add a slug here when its MDX file is written: its page is built
// and its title on the home page becomes a link.
export const WRITTEN_CASES = ["chunbo-checkout"];

export const DESIGNCASES: DesignCase[] = [
  {
    title: "Grocery Checkout",
    client: "Chunbo",
    result: "Completion rate up 10%",
    slug: "chunbo-checkout",
    sector: "Online grocery, China",
    role: "Sole designer",
    year: "2018",
    summary:
      "Redesigned checkout so customers knew their order would arrive in several packages. Completion rose about 10%.",
  },
  {
    title: "BPMe App",
    client: "bp",
    result: "Shipped car-wash feature based on site research",
    slug: "bp-car-wash",
    sector: "",
    role: "",
    year: "",
    summary: "",
  },
  {
    title: "Golf Companion App",
    client: "aboutGOLF",
    result: "Won a CES 2020 Innovation Award",
    slug: "aboutgolf",
    sector: "",
    role: "",
    year: "",
    summary: "",
  },
];
