import getIcon from '~/src/utils/getIcon.ts'

interface BadgePlainProps {
  title?: string
  color?: string
  icon?: string
  value?: string
}

export const badgePlain = async ({ title = 'Badge example', color = '#333', icon, value }: BadgePlainProps) => {
  const shift = icon ? 20 : 0

  const w1 = title.length * 6.5 + 20
  const w2 = value ? Math.max(value.length * 8.5, 20) : 0
  const w = w1 + w2 + shift

  return /* svg */ `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20">
  <title>${title}</title>
  <defs>
    <linearGradient id="s" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
      <stop offset="1" stop-opacity=".1" />
    </linearGradient>
    <clipPath id="r"><rect width="${w}" height="20" rx="3" fill="#fff" /></clipPath>
  </defs>
  <g clip-path="url(#r)">
    <rect width="${w1 + shift}" height="20" fill="${color}" />
    <rect x="${w1 + shift}" width="${w2}" height="20" fill="#007ec6" />
    <rect width="${w}" height="20" fill="url(#s)" />
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Arial,Geneva,sans-serif" text-rendering="geometricPrecision" font-size="110" transform="scale(.1)">
    <text x="${(w1 * 10) / 2 + shift * 10}" y="150" fill="#000" fill-opacity=".3">${title}</text>
    <text x="${(w1 * 10) / 2 + shift * 10}" y="140" fill="#fff">${title}</text>
    ${value ? `<text x="${w1 * 10 + (w2 * 10) / 2 + shift * 10}" y="140" fill="#fff">${value}</text>` : ''}
  </g>
  ${icon ? `<g style="transform: translateX(-${w / 2 - 12}px);">${await getIcon(icon)}</g>` : ''}
</svg>`
}
