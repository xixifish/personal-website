"use client";

import { HARBOUR, makeBricks } from "@/data/harbour";
import styles from "./BrickCanvas.module.css";
import { useEffect, useRef } from "react";

const CELL = 11;
const COLUMN = 895;
const GUTTER = 40;
const BOTTOM_UP = 10;

const BRICK_COLOUR = "rgba(252, 251, 248, 0.11)";
const STUD_WIDTH = 5;
const STUD_HEIGHT = 2;
const STUD_INSET = (CELL - STUD_WIDTH) / 2; // 3px, centres the stud on its cell

// The picture's size in pixels: 67 x 14 cells
const PICTURE_WIDTH = HARBOUR[0].length * CELL;
const PICTURE_HEIGHT = HARBOUR.length * CELL;

// Slow start, fast middle, soft landing. t goes from 0 to 1.
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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

        // 380 ms, plus 12 ms for each row it falls
        const duration = 380 + 12 * ((endY - startY) / CELL);

        // How far through the fall: 0 = just started, 1 = landed
        const t = Math.min((now - start) / duration, 1);
        if (t < 1) allLanded = false;

        drawBrick(x, startY + (endY - startY) * easeInOut(t), brick.width);
      });

      return allLanded;
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
      if (started) {
        clearInterval(timer);
        next = order.length;
        starts.fill(-Infinity); // every brick started long ago, so it has landed
      }

      draw(performance.now());
    };

    // Draw every frame until every brick has landed
    let rafId = 0;
    const frame = (now: number) => {
      const landed = draw(now);
      if (!landed) rafId = requestAnimationFrame(frame);
    };

    // Start the build once, when 30% of the footer is on screen
    let started = false;
    const startBuild = () => {
      started = true;
      timer = window.setInterval(step, 160);
      rafId = requestAnimationFrame(frame);
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
    viewObserver.observe(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      clearInterval(timer);
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
