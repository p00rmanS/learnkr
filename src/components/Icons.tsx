import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
export const Speaker = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 10v4h4l5 4V6L8 10H4z" /><path d="M16.5 9a4 4 0 010 6M19 6.5a8 8 0 010 11" /></svg>
);
/** Chat bubble: Taglish */
export const Bubble = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4V5z" /></svg>
);
/** Bolt: pro tip */
export const Bolt = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" /></svg>
);
/** Knot: memory hook */
export const Knot = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}><path d="M9 8a3 3 0 100 6h6a3 3 0 100-6M9 8h6M9 14h6" /></svg>
);
