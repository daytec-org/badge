import { Router } from 'jsr:@oak/oak/router'
import { favicon } from '~/src/router/favicon.ts'
import { routePlain } from '~/src/router/plain.ts'
import { routeSkill } from '~/src/router/skill.ts'
import { routeStack } from '~/src/router/stack.ts'

const router = new Router()
router.get('/favicon.ico', favicon)
router.get('/plain', routePlain)
router.get('/skill', routeSkill)
router.get('/stack', routeStack)

export default router
