export type DesignCase = {
  title: string;
  client: string;
  result: string;
  slug: string;
};

export const DESIGNCASES: DesignCase[] = [
  {
    title: "BPMe App",
    client: "bp",
    result: "Shipped car-wash feature based on site research",
    slug: "bp-car-wash",
  },
  {
    title: "Golf Companion App",
    client: "aboutGOLF",
    result: "Won a CES 2020 Innovation Award",
    slug: "aboutgolf",
  },
  {
    title: "Grocery Checkout",
    client: "Chunbo",
    result: "Completion rate up 10%",
    slug: "chunbo-checkout",
  },
];
