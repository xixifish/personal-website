"use client";

import { useState, type SubmitEvent } from "react";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const buttonText =
    status === "sending"
      ? "Sending..."
      : status === "sent"
        ? "Sent!"
        : "Send message";

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Stop the browser's own submit (page reload and jump to the top)
    event.preventDefault();
    // Save the form now: React clears event.currentTarget after an await
    const form = event.currentTarget;

    setStatus("sending");

    try {
      // Fake send for step 2: wait 1 second, then fail about half the time.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (Math.random() < 0.5) throw new Error("Fake failure");

      form.reset(); // empty the fields
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      // Keep what they typed, show the error
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="contact-email" className="visually-hidden">
        Your email
      </label>
      <input
        id="contact-email"
        className={styles.field}
        type="email"
        name="email"
        placeholder="Your email"
        autoComplete="email"
        required
      />

      <label htmlFor="contact-message" className="visually-hidden">
        Message
      </label>
      <textarea
        id="contact-message"
        className={styles.field}
        name="message"
        placeholder="Message"
        rows={4}
        maxLength={5000}
        required
      />

      {/* Honeypot: hidden from people and keyboards, bots fill it in */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.button}
          disabled={status === "sending"}
        >
          {buttonText}
        </button>
        <p role="status" className={styles.status}>
          {status === "error" &&
            "Sorry, couldn't send. Please email me instead."}
          {status === "sent" && (
            <span className="visually-hidden">Message sent.</span>
          )}
        </p>
      </div>
    </form>
  );
}
