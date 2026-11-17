"use client";

import { useRef, useEffect } from "react";
import styles from "./DotGlow.module.css";

// How much of the remaining distance the glow moves each frame (0 to 1).
// Higher feels snappier, lower feels floatier.
const EASE = 0.15;

export function DotGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canGlow = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canGlow) return;

    // Where the pointer is in the window
    let pointerX: number | undefined;
    let pointerY: number | undefined;
    // Where the glow is heading (target) and where it is drawn now (current), in page coordinates
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isShown = false;
    let frame = 0; // id of the next animation frame, 0 when the loop is stopped

    function draw() {
      glowRef.current?.style.setProperty("--x", `${currentX}px`);
      glowRef.current?.style.setProperty("--y", `${currentY}px`);
    }

    function tick() {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;

      const arrived =
        Math.abs(targetX - currentX) < 0.5 &&
        Math.abs(targetY - currentY) < 0.5;

      if (arrived) {
        currentX = targetX;
        currentY = targetY;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      draw();
    }

    function placeGlow() {
      if (pointerX === undefined || pointerY === undefined) return;
      targetX = pointerX + window.scrollX;
      targetY = pointerY + window.scrollY;

      // First appearance: jump straight to the pointer, don't fly in
      if (!isShown) {
        currentX = targetX;
        currentY = targetY;
        isShown = true;
        draw();
        return;
      }

      if (frame === 0) frame = requestAnimationFrame(tick);
    }

    function handleMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      placeGlow();
    }

    function hideGlow() {
      cancelAnimationFrame(frame);
      frame = 0;
      isShown = false;
      pointerX = undefined;
      pointerY = undefined;
      glowRef.current?.style.removeProperty("--x");
      glowRef.current?.style.removeProperty("--y");
    }

    window.addEventListener("pointermove", handleMove);
    /* { passive: true }: a promise to the browser that this listener won't block scrolling. */
    /* The browser can then scroll smoothly without waiting. */
    window.addEventListener("scroll", placeGlow, { passive: true });
    /* When pointer leaves the page, the glow disappears */
    document.documentElement.addEventListener("pointerleave", hideGlow);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", placeGlow);
      document.documentElement.removeEventListener("pointerleave", hideGlow);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true"></div>;
}
