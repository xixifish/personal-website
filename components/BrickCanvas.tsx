"use client";

import { HARBOUR, makeBricks } from "@/data/harbour";
import styles from "./BrickCanvas.module.css";
import { useEffect, useRef } from "react";

const CELL = 11;
const COLUMN = 895;
const GUTTER = 40;
const BOTTOM_UP = 10;

// Bricks and fireworks share one colour; only the opacity changes
const light = (opacity: number) => `rgba(252, 251, 248, ${opacity})`;

const BRICK_COLOUR = light(0.09);
const STUD_WIDTH = 5;
const STUD_HEIGHT = 2;
const STUD_INSET = (CELL - STUD_WIDTH) / 2; // 3px, centres the stud on its cell

// The picture's size in pixels: 67 x 14 cells
const PICTURE_WIDTH = HARBOUR[0].length * CELL;
const PICTURE_HEIGHT = HARBOUR.length * CELL;

// Once per visit: a flag in sessionStorage after the show has played.
// Storage can be blocked (private mode, strict settings), so both
// helpers fail quietly: then the show just plays again.
const PLAYED_KEY = "harbour-played";

const hasPlayed = () => {
  try {
    return sessionStorage.getItem(PLAYED_KEY) === "yes";
  } catch {
    return false;
  }
};

const markPlayed = () => {
  try {
    sessionStorage.setItem(PLAYED_KEY, "yes");
  } catch {
    // Not saved: the show plays again next time, which is fine
  }
};

// Slow start, fast middle, soft landing. t goes from 0 to 1.
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Fast at first, slow near the top. t goes from 0 to 1.
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const FIREWORKS_STEP = 160; // ms between spark moves
const FIREWORKS_STEPS = 75; // about 12 seconds
const LAUNCH_EVERY = 5; // steps between rockets
const QUIET_END = 16; // no launches in the last 16 steps, so 12 rockets in all

// How long one brick takes to fall: base + per row, about 0.45 s
// (the spec's first version was 380 + 12, about 0.7 s)
const FALL_BASE = 250; // ms
const FALL_PER_ROW = 8; // ms

const SPARK_COUNT = 14;
const SPARK_SPEEDS = [1.25, 0.7]; // cells per step: outer ring, inner ring
const GRAVITY = 0.1; // added to the downward speed each step
const LIFE_LOSS = 0.1; // per step, so a spark lasts 10 steps
const SPARK_OPACITY = 0.5; // at full life

const ROCKET_OPACITY = 0.45;
// Two tail bricks on the same path, a bit behind the rocket
const TAIL = [
  { lag: 0.07, opacity: 0.23 },
  { lag: 0.14, opacity: 0.1 },
];

export function BrickCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const bricks = makeBricks(HARBOUR);

    // Build order: bottom row first, random inside each row.
    // 1. Shuffle a copy (Fisher–Yates): from the last brick down,
    //    swap each one with a random brick at or before it.
    const order = [...bricks];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    // 2. Sort by row, biggest row number (bottom) first.
    //    Sort keeps the shuffled order for bricks in the same row.
    order.sort((a, b) => b.row - a.row);

    // When each brick starts falling (same index as order).
    // Infinity = not started yet, so "now < start" is true until it starts.
    const starts = order.map(() => Infinity);
    let next = 0; // the next brick to start
    let timer = 0; // the interval's id, so it can be stopped

    // Every 160 ms, start 2 bricks: one now, one 80 ms later
    const step = () => {
      const now = performance.now();
      if (next < order.length) starts[next++] = now;
      if (next < order.length) starts[next++] = now + 80;
      if (next >= order.length) clearInterval(timer);
    };

    // Rockets, in cells from the picture's corner (like the bricks)
    type Rocket = {
      col: number;
      fromRow: number;
      toRow: number;
      start: number;
      duration: number;
    };
    let rockets: Rocket[] = [];
    let fireworksStarted = false;

    const launchRocket = (now: number) => {
      const cols = HARBOUR[0].length;
      const fromRow = HARBOUR.length - 1; // the bottom row

      // A random column, at least 2 cells from each side
      const col = 2 + Math.floor(Math.random() * (cols - 4));

      // Stop somewhere between 2 rows below the footer top (highest)
      // and 5 rows above the picture (lowest). Negative rows are above the picture.
      const highest = Math.ceil((2 * CELL - top) / CELL);
      const lowest = -5;
      const toRow =
        highest + Math.floor(Math.random() * (lowest - highest + 1));

      rockets.push({
        col,
        fromRow,
        toRow,
        start: now,
        duration: 600 + 15 * (fromRow - toRow), // 600 ms + 15 ms per row
      });
    };

    // Sparks, in cells from the picture's corner. x and y are fractions
    // while moving; they're drawn in the nearest cell.
    type Spark = { x: number; y: number; vx: number; vy: number; life: number };
    let sparks: Spark[] = [];
    let fireworksTimer = 0;
    let fireworksRunning = false; // true from the first step until the last
    let fireworksStepCount = 0;

    // 14 sparks spread evenly around a circle, alternating fast and slow,
    // which makes an outer and an inner ring
    const burst = (col: number, row: number) => {
      for (let k = 0; k < SPARK_COUNT; k++) {
        const angle = (k / SPARK_COUNT) * Math.PI * 2;
        const speed = SPARK_SPEEDS[k % SPARK_SPEEDS.length];
        sparks.push({
          x: col,
          y: row,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
    };

    // One fireworks step: maybe launch a rocket, then move every spark,
    // pull it down, fade it
    const fireworksStep = () => {
      // Launch on steps 0, 5, 10 … 55, while at least 16 steps are left
      if (
        fireworksStepCount % LAUNCH_EVERY === 0 &&
        fireworksStepCount <= FIREWORKS_STEPS - QUIET_END
      ) {
        launchRocket(performance.now());
      }

      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += GRAVITY;
        s.life -= LIFE_LOSS;
      }
      // Tiny margin: 1 - 0.1 x 10 isn't exactly 0 in floating point
      sparks = sparks.filter((s) => s.life > 1e-9);

      fireworksStepCount++;

      // After 75 steps, once nothing is left in the air: stop for good
      if (
        fireworksStepCount >= FIREWORKS_STEPS &&
        rockets.length === 0 &&
        sparks.length === 0
      ) {
        clearInterval(fireworksTimer);
        fireworksRunning = false;
        markPlayed();
      }
    };

    // Called once, when the last brick lands
    const startFireworks = () => {
      fireworksStarted = true;
      fireworksRunning = true;
      fireworksStepCount = 0;
      fireworksStep(); // step 0 right away: the first rocket
      fireworksTimer = window.setInterval(fireworksStep, FIREWORKS_STEP);
    };

    // Shared between resize and draw. Set by resize, read by draw
    let width = 0; // canvas size in CSS pixels
    let height = 0;
    let left = 0; // picture's top-left corner
    let top = 0;
    let fits = false; // false on phones: no bricks

    // One brick at a pixel position: a body, plus one stud per cell on top.
    // A stud overlaps the brick above it, and the two see-through layers add up,
    // so the joins look a little brighter.
    const drawBrick = (x: number, y: number, cells: number) => {
      // Body: 1px shorter than its cells, leaving a seam to the next brick
      context.fillRect(x, y, cells * CELL - 1, CELL);

      // Studs: 5 x 2, centred on each cell, 2px above the brick
      for (let i = 0; i < cells; i++) {
        context.fillRect(
          x + i * CELL + STUD_INSET,
          y - STUD_HEIGHT,
          STUD_WIDTH,
          STUD_HEIGHT,
        );
      }
    };

    // Clear and draw every brick at its place at time "now".
    // Returns true when every brick has landed.
    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      if (!fits) return true;

      context.fillStyle = BRICK_COLOUR;
      let allLanded = true;

      order.forEach((brick, i) => {
        const start = starts[i];

        // Not started yet: not drawn, and not landed
        if (now < start) {
          allLanded = false;
          return;
        }

        const x = left + brick.col * CELL;
        const endY = top + brick.row * CELL; // its place in the picture
        const startY = -CELL; // one row above the footer

        // A base time, plus a little for each row it falls
        const duration = FALL_BASE + FALL_PER_ROW * ((endY - startY) / CELL);

        // How far through the fall: 0 = just started, 1 = landed
        const t = Math.min((now - start) / duration, 1);
        if (t < 1) allLanded = false;

        drawBrick(x, startY + (endY - startY) * easeInOut(t), brick.width);
      });

      // Rockets that have arrived burst into sparks; the rest keep flying
      const flying: Rocket[] = [];
      for (const r of rockets) {
        if (now - r.start < r.duration) flying.push(r);
        else burst(r.col, r.toRow);
      }
      rockets = flying;

      for (const r of rockets) {
        const x = left + r.col * CELL;
        // Pixel y at a point t (0 to 1) of the flight
        const yAt = (t: number) =>
          top + (r.fromRow + (r.toRow - r.fromRow) * easeOut(t)) * CELL;
        const t = (now - r.start) / r.duration;

        // Tail first, so the rocket is drawn on top of it
        for (const tail of TAIL) {
          if (t - tail.lag < 0) continue;
          context.fillStyle = light(tail.opacity);
          drawBrick(x, yAt(t - tail.lag), 1);
        }
        context.fillStyle = light(ROCKET_OPACITY);
        drawBrick(x, yAt(t), 1);
      }

      // Sparks: one-cell bricks in their nearest cell, fading with life
      for (const s of sparks) {
        context.fillStyle = light(SPARK_OPACITY * s.life);
        drawBrick(
          left + Math.round(s.x) * CELL,
          top + Math.round(s.y) * CELL,
          1,
        );
      }

      // Done when every brick has landed, the fireworks have finished,
      // and nothing is flying. The running flag keeps the loop going
      // in quiet moments between two rockets.
      return (
        allLanded &&
        !fireworksRunning &&
        rockets.length === 0 &&
        sparks.length === 0
      );
    };

    // Size the canvas and work out where the picture goes, then draw
    const resize = () => {
      // Sharp on Retina, but no more than 2x
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;

      // Real pixels = displayed size x ratio
      // (setting width/height also clears the canvas)
      canvas.width = width * ratio;
      canvas.height = height * ratio;

      // Draw in CSS pixels from here on
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      // The column, worked out like the wrapper's CSS:
      // width: min(100% - 2.5rem, 895px), centred
      const columnWidth = Math.min(width - GUTTER, COLUMN);
      const columnRight = (width + columnWidth) / 2;

      // Picture doesn't fit (phones): draw nothing
      fits = columnWidth >= PICTURE_WIDTH;

      // The picture's top-left corner: right edge on the column's right edge,
      // bottom BOTTOM_UP px above the footer's bottom.
      // Rounded, because half pixels make the brick edges blurry.
      left = Math.round(columnRight - PICTURE_WIDTH);
      top = Math.round(height - BOTTOM_UP - PICTURE_HEIGHT);

      // Resized during or after the build: jump to the finished picture
      if (started) finish();

      draw(performance.now());
    };

    // Draw every frame until nothing is moving
    let rafId = 0;
    const frame = (now: number) => {
      let done = draw(now);

      // The last brick has landed: start the fireworks (once)
      if (done && fits && !fireworksStarted) {
        startFireworks();
        done = false;
      }

      if (!done) rafId = requestAnimationFrame(frame);
    };

    // Start the build once, when 30% of the footer is on screen
    let started = false;
    const startBuild = () => {
      started = true;
      timer = window.setInterval(step, 160);
      rafId = requestAnimationFrame(frame);
    };

    // Jump straight to the finished picture: no build, no fireworks.
    // Used on resize, with reduced motion, and when it already played.
    const finish = () => {
      started = true;
      clearInterval(timer);
      next = order.length;
      starts.fill(-Infinity); // every brick started long ago, so it has landed
      rockets = [];
      sparks = [];
      clearInterval(fireworksTimer);
      fireworksRunning = false;
      fireworksStarted = true;
      markPlayed();
    };

    const viewObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio >= 0.3) {
          viewObserver.disconnect(); // only once
          startBuild();
        }
      },
      { threshold: 0.3 },
    );

    // Reduced motion, or already played this visit: show the finished
    // picture (the first resize draws it). Otherwise wait for the footer.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || hasPlayed()) {
      finish();
    } else {
      viewObserver.observe(canvas);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      clearInterval(timer);
      clearInterval(fireworksTimer);
      cancelAnimationFrame(rafId);
      viewObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className={styles.canvas}
      ref={canvasRef}
    ></canvas>
  );
}
