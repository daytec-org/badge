import { type Context } from 'jsr:@oak/oak/'
import { badgeSkill } from '~/src/badge/skill.ts'
import { requestLog } from '~/src/utils/log.ts'

export async function handleStack({ request, response }: Context) {
  requestLog(`Stack badge`, request)
  const skills = (() => {
    try {
      return decodeURIComponent(request.url.searchParams.toString()).split(';')
    } catch {
      return []
    }
  })()

  if (skills.length < 2) {
    response.status = 400
    response.body = 'Wrong request'
    return
  }

  const details = skills.map(skill =>
    skill.split('&').reduce<Record<string, string>>((acc, curr) => {
      const [name, value] = curr.split('=')
      return { ...acc, [name]: value }
    }, {}),
  )

  const arr = await Promise.all(details.map(data => badgeSkill(data)))

  const GAP = 10
  const width = arr.map(({ dimensions }) => dimensions[0]).reduce((a, b) => a + b + GAP, 0) - GAP
  const w = Math.max(...arr.map(({ dimensions }) => dimensions[0]))
  const h = Math.max(...arr.map(({ dimensions }) => dimensions[1]))
  const stackSvg = arr.reduce((acc, curr, i) => {
    const svg = `<svg x="${i * (w + GAP)}" ${curr.svg.slice(5)}`
    acc = `${acc}${svg}`
    return acc
  }, `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${h}" viewBox="0 0 ${width} ${h}" fill="none">`)

  response.type = 'image/svg+xml; charset=utf-8'
  response.body = `${stackSvg}</svg>`
}
