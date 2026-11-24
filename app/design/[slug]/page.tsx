import { DESIGNCASES } from "@/data/designCases";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import { CaseMenu } from "@/components/CaseMenu";

// Cases that have an article in content/design/<slug>.mdx.
// Add a slug here when its MDX file is written.
const WRITTEN_CASES = ["chunbo-checkout"];

// Build one page per written case. Any other slug gives a 404.
export function generateStaticParams() {
  return WRITTEN_CASES.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const designCase = DESIGNCASES.find((item) => item.slug === slug);
  if (!designCase) notFound();

  return { title: designCase.title, description: designCase.summary };
}

export default async function DesignCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const designCase = DESIGNCASES.find((item) => item.slug === slug);
  if (!designCase) notFound();

  const { default: Article } = await import(`@/content/design/${slug}.mdx`);

  return (
    <main className={styles.main}>
      <Link href="/#design" className={styles.back}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15.8335 10H4.16683" />
          <path d="M10 4.16675L4.16667 10.0001L10 15.8334" />
        </svg>
        Back
      </Link>
      <div className={styles.layout}>
        <CaseMenu className={styles.menu} />
        <article className={styles.article}>
          <h1>{designCase.title}</h1>
          <p className={styles.meta}>
            <strong>{designCase.client}</strong>
            {" · "}
            {[designCase.sector, designCase.role, designCase.year].join(" · ")}
          </p>
          <div className={styles.body}>
            <Article />
          </div>
        </article>
      </div>
    </main>
  );
}
