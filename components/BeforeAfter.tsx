"use client";

import { type CSSProperties, useState } from "react";
import styles from "./BeforeAfter.module.css";
import Image, { StaticImageData } from "next/image";

type BeforeAfterProps = {
  before: StaticImageData;
  after: StaticImageData;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: BeforeAfterProps) {
  const [pos, setPos] = useState(50);

  return (
    <div className={styles.wrapper} style={{ "--p": pos } as CSSProperties}>
      <Image
        src={after}
        alt={afterAlt}
        sizes="(max-width: 700px) 100vw, 650px"
      />
      <Image
        src={before}
        alt={beforeAlt}
        sizes="(max-width: 700px) 100vw, 650px"
        className={styles.before}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        aria-label="Compare before and after"
        className={styles.range}
      />
      <div className={styles.line} aria-hidden="true">
        <span className={styles.handle}>
          <svg
            width="27"
            height="14"
            viewBox="0 0 23 12"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M16.6001 10.6001L21.6001 5.6001L16.6001 0.600098" />
            <path d="M5.6001 10.6001L0.600098 5.6001L5.6001 0.600098" />
          </svg>
        </span>
      </div>
      <span
        className={`${styles.label} ${styles.labelBefore}`}
        aria-hidden="true"
      >
        Before
      </span>
      <span
        className={`${styles.label} ${styles.labelAfter}`}
        aria-hidden="true"
      >
        After
      </span>
    </div>
  );
}
