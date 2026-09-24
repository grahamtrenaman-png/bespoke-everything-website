export type Era = {
  year: string;
  label: string;
  bespoke: number;
  dot: string;
  brand?: boolean;
};

export const ERAS: Era[] = [
  { year: "2000's", label: "Paper", bespoke: 62, dot: "#f59e0b" },
  { year: "", label: "Spreadsheets", bespoke: 50, dot: "#fb923c" },
  { year: "2010's", label: "On-prem", bespoke: 40, dot: "#f97316" },
  { year: "", label: "Hosted", bespoke: 30, dot: "#38bdf8" },
  { year: "2020's", label: "SaaS", bespoke: 16, dot: "#94a3b8" },
  { year: "Now", label: "jalipi", bespoke: 100, dot: "#14b8a6", brand: true },
];

export const Y_TOP = 8;
export const Y_RANGE = 78;
export const yFor = (bespoke: number) => Y_TOP + (1 - bespoke / 100) * Y_RANGE;
export const xFor = (index: number, count: number) => ((index + 0.5) / count) * 100;

export function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const clamp = (value: number, a: number, b: number) =>
    Math.max(Math.min(a, b), Math.min(Math.max(a, b), value));
  const d = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = clamp(p1.x + (p2.x - p0.x) / 6, p1.x, p2.x);
    const cp1y = clamp(p1.y + (p2.y - p0.y) / 6, p1.y, p2.y);
    const cp2x = clamp(p2.x - (p3.x - p1.x) / 6, p1.x, p2.x);
    const cp2y = clamp(p2.y - (p3.y - p1.y) / 6, p1.y, p2.y);
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }
  return d.join(" ");
}
