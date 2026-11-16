"use client";

import styles from "./CopyEmail.module.css";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Copy failed: the address is still visible on the email button
    }
  }
  return (
    <>
      <button className={styles.copyButton} type="button" onClick={handleCopy}>
        {copied ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="visually-hidden">
        {copied ? "Email copied" : ""}
      </span>
    </>
  );
}
