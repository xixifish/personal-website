"use client";
import { useEffect, useState } from "react";

// The side menu on a design case page. Same four sections on every case.
// rehype-slug gives the h2s in the MDX their ids.
const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "what-i-did", label: "What I did" },
  { id: "result", label: "Result" },
  { id: "more-screens", label: "Screens" },
];

// A section counts as current once its heading is this close to the top
// of the screen. Must be more than scroll-margin-top (64px on phones),
// so a heading you jump to counts as current.
const OFFSET = 100;

export function CaseMenu({ className }: { className: string }) {
  // null = still reading the brief at the top, so no link is current
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      let current: string | null = null;
      for (const section of SECTIONS) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= OFFSET) {
          current = section.id;
        }
      }
      setCurrentId(current);
    }

    update(); // the page may open part-way down, e.g. a link to #result
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav aria-label="On this page" className={className}>
      <ul>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={section.id === currentId ? "true" : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
