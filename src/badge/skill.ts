import getIcon from '~/src/utils/getIcon.ts'

interface BadgePlainProps {
  title?: string
  size?: string
  color?: string
  icon?: string
  value?: string
}

const SIZE = 64
const padding = 14
const strokeWidth = 8
const radius = SIZE / 2 - strokeWidth / 2
const L = Math.PI * 2 * radius
let id = 0

async function getSvgIcon(width: number, icon?: string) {
  if (!icon) return ''

  const iconSvg = await getIcon(icon)
  return iconSvg
    ? `<svg x="${width / 4}" y="${SIZE / 4}" width="${width / 2}" height="${SIZE / 2}" ${iconSvg.slice(5)}`
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
  const idStr = (id += 1).toString(16)
  const len = ((Number(value) || 0) / 100) * L
  const delay = ~~(Math.random() * 1000)
  const s = getSize(size)
  const width = s + padding * 2
  const lines = title ? title.split(',') : []
  const dh = lines.length * 20 + (lines.length ? 4 : 0)
  const text = lines.reduce(
    (acc, curr, i) => `${acc}<text x="${width / 2}" y="${SIZE + (i + 1) * 20}">${curr}</text>`,
    '',
  )

  return {
    svg: /* svg */ `
<svg width="${width}" height="${s + dh}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${
      SIZE + dh
    }" fill="none">
  <style>
.chart_${idStr} {
  stroke: ${color};
  stroke-dasharray: ${L.toFixed(2)};
  stroke-dashoffset: ${L.toFixed(2)};
  fill: none;
  stroke-width: ${strokeWidth};
  animation: chart-animation_${idStr} 1s forwards ${delay}ms ease-in-out;
  transform: rotate(-90deg);
  transform-origin: ${width / 2}px ${SIZE / 2}px;
}
@keyframes chart-animation_${idStr} {
  from {
    stroke-dashoffset: ${L.toFixed(2)};
  }
  to {
    stroke-dashoffset: ${(L - len).toFixed(2)};
  }
}
  </style>
  <circle r="${radius}" cx="${width / 2}" cy="${SIZE / 2}" fill="#333" />
  <circle r="${radius}" cx="${width / 2}" cy="${SIZE / 2}" stroke-width="${strokeWidth}" stroke="#555" />
  <circle class="chart_${idStr}" r="${radius}" cx="${width / 2}" cy="${SIZE / 2}"/>
  ${await getSvgIcon(width, icon)}
  <g font-family="Verdana,Arial,Geneva,sans-serif" font-size="16px" fill="#888" text-anchor="middle">${text}</g>
</svg>`,
    dimensions: [width, s + dh],
  }
}
