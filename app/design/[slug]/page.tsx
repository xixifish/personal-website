// Cases that have an article in content/design/<slug>.mdx.
// Add a slug here when its MDX file is written.
const WRITTEN_CASES = ["chunbo-checkout"];

// Build one page per written case. Any other slug gives a 404.
export function generateStaticParams() {
  return WRITTEN_CASES.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function DesignCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Article } = await import(`@/content/design/${slug}.mdx`);

  return <Article />;
}
