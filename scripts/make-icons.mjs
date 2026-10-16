/**
 * Draws the app icon (a tiny Hangul block: red ring, blue bar, gold base) and writes
 * PNG files with no dependencies. Run with: node scripts/make-icons.mjs
 */
import { deflateSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';

const BG = [12, 14, 20];
const RED = [255, 90, 68];
const BLUE = [93, 141, 255];
const GOLD = [244, 189, 72];

const inRoundRect = (x, y, x0, y0, x1, y1, r) => {
  if (x < x0 || x > x1 || y < y0 || y > y1) return false;
  const cx = Math.min(Math.max(x, x0 + r), x1 - r);
  const cy = Math.min(Math.max(y, y0 + r), y1 - r);
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
};

/** Colour of the mark at (u, v) in [0,1]^2, or null for transparent. */
function mark(u, v) {
  const d = Math.hypot(u - 0.3, v - 0.3);
  if (d <= 0.27 && d >= 0.145) return RED;
  if (inRoundRect(u, v, 0.7, 0.02, 0.84, 0.6, 0.07)) return BLUE;
  if (inRoundRect(u, v, 0.06, 0.78, 0.94, 0.93, 0.07)) return GOLD;
  return null;
}

function render(size, { maskable }) {
  const SS = 3;
  const px = Buffer.alloc(size * size * 4);
  // the mark sits in a centred box; smaller for maskable icons so OS masks never clip it
  const box = maskable ? 0.5 : 0.62;
  const off = (1 - box) / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const nx = (x + (sx + 0.5) / SS) / size;
          const ny = (y + (sy + 0.5) / SS) / size;
          const inside = maskable || inRoundRect(nx, ny, 0, 0, 1, 1, 0.22);
          if (!inside) continue;
          const m = mark((nx - off) / box, (ny - off) / box);
          const c = m ?? BG;
          r += c[0]; g += c[1]; b += c[2]; a += 255;
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      const cov = a / (255 * n);
      px[i] = cov ? Math.round(r / (cov * n)) : 0;
      px[i + 1] = cov ? Math.round(g / (cov * n)) : 0;
      px[i + 2] = cov ? Math.round(b / (cov * n)) : 0;
      px[i + 3] = Math.round(cov * 255);
    }
  }
  return px;
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

function png(size, opts) {
  const raw = render(size, opts);
  const rows = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    rows[y * (size * 4 + 1)] = 0;
    raw.copy(rows, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync('public/icons', { recursive: true });
const files = [
  ['public/icons/icon-192.png', 192, { maskable: false }],
  ['public/icons/icon-512.png', 512, { maskable: false }],
  ['public/icons/maskable-512.png', 512, { maskable: true }],
  ['public/icons/apple-touch-icon.png', 180, { maskable: true }],
];
for (const [path, size, opts] of files) {
  const data = png(size, opts);
  writeFileSync(path, data);
  console.log(`wrote ${path} (${size}x${size}, ${(data.length / 1024).toFixed(1)} KB)`);
}
