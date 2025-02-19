import { type Context } from 'jsr:@oak/oak/'
import { badgeSkill } from '~/src/badge/skill.ts'
import { requestLog } from '~/src/utils/log.ts'

export async function routeSkill({ request, response }: Context) {
  requestLog(`Skill badge`, request)

  const title = request.url.searchParams.get('title') ?? undefined
  const size = request.url.searchParams.get('size') ?? undefined
  const color = request.url.searchParams.get('color') ?? undefined
  const icon = request.url.searchParams.get('icon') ?? undefined
  const value = request.url.searchParams.get('value') ?? undefined

  response.type = 'image/svg+xml; charset=utf-8'
  response.body = (await badgeSkill({ title, size, color, icon, value })).svg
}
