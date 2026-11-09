import styles from "./Divider.module.css";

function Sparkle() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
    >
      <path d="M6 2.5V9.5" />
      <path d="M9.03272 4.24799L2.97021 7.74799" />
      <path d="M2.97021 4.25201L9.03272 7.75201" />
    </svg>
  );
}

export function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <Sparkle />
      <Sparkle />
      <Sparkle />
    </div>
  );
}
