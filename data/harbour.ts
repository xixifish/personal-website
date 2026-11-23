type Brick = { row: number; col: number; width: number };

const WIDTHS = [3, 4, 6, 8];

// The picture: 67 cells wide, 14 rows tall. "#" is a filled cell.
// Harbour Bridge on the left, Opera House on the right, water along the bottom.
export const HARBOUR = [
  ".....................................................##............",
  "..............######...............................####............",
  "..........####......####..........................####.............",
  ".......###...#....#.....###......................#####.....##......",
  ".....##..#...#....#...#....##........##.........#####....####......",
  "..###.#..#...#....#...#..#...###.....####......######...####.......",
  "..##..#..#...#....#...#..#....##......####.....#####...#####....##.",
  "..##..#..#...#....#...#..#....##......#####...######...####...####.",
  "##################################.....####...######..#####..####..",
  "..##..........................##.......#####.######...####...###...",
  "..##..........................##........####.######..#####..####...",
  "....................................###############################",
  "####..####..####..####..####..####..####..####..####..####..####..#",
  ".####..####..####..####..####..####..####..####..####..####..####..",
];

export function makeBricks(map: string[]): Brick[] {
  // 1. Go through each row (its index is the row number)
  // 2. Walk along the row with a column counter, starting at 0
  //    - Not a "#": move on one column
  //    - A "#": find where this run of "#" ends
  // 3. Cut the run: while cells are left in it,
  //    pick a random with from WIDTHS,
  //    use the smaller of that and what's left,
  //    push { row, col, width }, move col forward by that width
  const bricks: Brick[] = [];

  for (let row = 0; row < map.length; row++) {
    const line = map[row];

    let col = 0;

    while (col < line.length) {
      // Not a "#": move on one column
      if (line[col] !== "#") {
        col++;
        continue;
      }

      // A "#": find where this run ends (first cell after it)
      let end = col;
      while (end < line.length && line[end] === "#") end++;

      if (col < end) {
        const pick = WIDTHS[Math.floor(Math.random() * WIDTHS.length)];
        const width = Math.min(pick, end - col);
        bricks.push({ row, col, width });
        col += width;
      }
    }
  }

  return bricks;
}
