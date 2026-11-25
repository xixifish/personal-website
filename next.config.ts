import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
};

// Plugin names are strings because Turbopack can't take imported functions.
// rehype-slug gives each heading an id from its text, e.g. "what-i-did".
const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
