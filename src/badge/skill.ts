import getIcon from '~/src/utils/getIcon.ts'

interface BadgePlainProps {
  title?: string
  size?: string
  color?: string
  icon?: string
  value?: string
}

const SIZE = 64
const strokeWidth = 8
const radius = SIZE / 2 - strokeWidth / 2
const L = Math.PI * 2 * radius

async function getSvgIcon(icon?: string) {
  if (!icon) return ''

  const iconSvg = await getIcon(icon)
  return iconSvg
    ? `<svg x="${SIZE / 4}" y="${SIZE / 4}" width="${SIZE / 2}" height="${SIZE / 2}" ${iconSvg.slice(5)}`
    : ''
}

function getSize(size?: string) {
  if (!size) return SIZE
  if (size.endsWith('px')) return Number(size.slice(0, -2)) || SIZE
  if (Number.isFinite(Number(size))) return Number(size)
  if (size === 'small') return SIZE / 2
  if (size === 'large') return SIZE * 2
  return SIZE
}

export const badgeSkill = async ({ title, size, color = '#007ec6', icon, value }: BadgePlainProps) => {
  const len = ((Number(value) || 0) / 100) * L
  const delay = ~~(Math.random() * 1000)
  const s = getSize(size)
  const lines = title ? title.split(',') : []
  const dh = lines.length * 16 + (lines.length ? 4 : 0)
  const text = lines.reduce(
    (acc, curr, i) => `${acc}<text x="${SIZE / 2}" y="${SIZE + (i + 1) * 16}">${curr}</text>`,
    '',
  )

  return {
    svg: /* svg */ `
<svg width="${s}" height="${s + dh}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE + dh}" fill="none">
  <style>
.chart {
  stroke: ${color};
  stroke-dasharray: ${L.toFixed(2)};
  fill: none;
  stroke-width: ${strokeWidth};
  animation: chart-animation 1s forwards ${delay}ms ease-in-out;
  transform: rotate(-90deg);
  transform-origin: ${SIZE / 2}px ${SIZE / 2}px;
}
@keyframes chart-animation {
  from {
    stroke-dashoffset: ${L.toFixed(2)};
  }
  to {
    stroke-dashoffset: ${(L - len).toFixed(2)};
  }
}
  </style>
  <circle r="${radius}" cx="${SIZE / 2}" cy="${SIZE / 2}" fill="#333" />
  <circle r="${radius}" cx="${SIZE / 2}" cy="${SIZE / 2}" stroke-width="${strokeWidth}" stroke="#888" />
  <circle class="chart" r="${radius}" cx="${SIZE / 2}" cy="${SIZE / 2}"/>
  ${await getSvgIcon(icon)}
  <g font-family="Verdana,Arial,Geneva,sans-serif" font-size="16px" fill="#888" text-anchor="middle">${text}</g>
</svg>`,
    dimensions: [s, s + dh],
  }
}
