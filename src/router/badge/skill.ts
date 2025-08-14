import { type Context } from 'jsr:@oak/oak/'
import { badgeSkill } from '~/src/badge/skill.ts'
import { badgeProps } from '../badgeRoutes.ts'

export async function handleBadgeSkill({ request, response }: Context, props: badgeProps[]) {
  const values = Object.fromEntries(props.map(prop => [prop, request.url.searchParams.get(prop) ?? undefined]))

  response.type = 'image/svg+xml; charset=utf-8'
  response.body = (await badgeSkill(values)).svg
}
