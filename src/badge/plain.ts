export const badgePlain = (title = "Badge example", color = "#333") => {
  const w = title.length * 6.5 + 20;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="20">
  <title>${title}</title>
  <defs>
    <linearGradient id="s" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
      <stop offset="1" stop-opacity=".1" />
    </linearGradient>
    <clipPath id="r"><rect width="${w}" height="20" rx="3" fill="#fff" /></clipPath>
  </defs>
  <g clip-path="url(#r)">
    <rect width="${w}" height="20" fill="${color}" />
    <rect width="${w}" height="20" fill="url(#s)" />
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Arial,Geneva,sans-serif" text-rendering="geometricPrecision" font-size="110" transform="scale(.1)">
    <text x="${
      (w * 10) / 2
    }" y="150" fill="#000" fill-opacity=".3">${title}</text>
    <text x="${(w * 10) / 2}" y="140" fill="#fff">${title}</text>
  </g>
</svg>`;
};
