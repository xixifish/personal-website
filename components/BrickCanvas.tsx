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

export function BrickCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const bricks = makeBricks(HARBOUR);

    const resize = () => {
      // Sharp on Retina, but no more than 2x
      const ratio = Math.min(window.devicePixelRatio, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

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
      if (columnWidth < PICTURE_WIDTH) return;

      // The picture's top-left corner: right edge on the column's right edge,
      // bottom BOTTOM_UP px above the footer's bottom.
      // Rounded, because half pixels make the brick edges blurry.
      const left = Math.round(columnRight - PICTURE_WIDTH);
      const top = Math.round(height - BOTTOM_UP - PICTURE_HEIGHT);

      // Draw every brick: a body, plus one stud per cell on top.
      // A stud overlaps the brick above it, and the two see-through
      // layers add up, so the joins look a little brighter.
      context.fillStyle = BRICK_COLOUR;
      for (const brick of bricks) {
        const x = left + brick.col * CELL;
        const y = top + brick.row * CELL;

        // Body: 1px shorter than its cells, leaving a seam to the next brick
        context.fillRect(x, y, brick.width * CELL - 1, CELL);

        // Studs: 5 x 2, centred on each cell, 2px above the brick
        for (let i = 0; i < brick.width; i++) {
          context.fillRect(
            x + i * CELL + STUD_INSET,
            y - STUD_HEIGHT,
            STUD_WIDTH,
            STUD_HEIGHT,
          );
        }
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className={styles.canvas}
      ref={canvasRef}
    ></canvas>
  );
}
