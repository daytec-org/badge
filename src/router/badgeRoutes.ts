import { type Context } from 'jsr:@oak/oak/'
import { handleBadgePlain } from '~/src/router/badge/plain.ts'
import { handleBadgeSkill } from '~/src/router/badge/skill.ts'
import { handleStack } from '~/src/router/badge/stack.ts'

export type TBadgeProps = 'title' | 'color' | 'icon' | 'size' | 'value'
type methods = 'get' | 'post' | 'put' | 'patch' | 'delete'
interface Route {
  method: methods
  path: string
  handler: (props: TBadgeProps[]) => ({ request, response }: Context) => Promise<void>
  props: TBadgeProps[]
}

export const badgeRoutes: Route[] = [
  {
    method: 'get',
    path: '/plain',
    handler: props => ctx => handleBadgePlain(ctx, props),
    props: ['title', 'color', 'icon', 'value'],
  },
  {
    method: 'get',
    path: '/skill',
    handler: props => ctx => handleBadgeSkill(ctx, props),
    props: ['title', 'size', 'color', 'icon', 'value'],
  },
  {
    method: 'get',
    path: '/stack',
    handler: props => ctx => handleStack(ctx),
    props: [],
  },
]
