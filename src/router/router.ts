import { Router } from 'jsr:@oak/oak/router'
import { handleFavicon } from '~/src/router/favicon.ts'
import { handleBadgePlain } from '~/src/router/plain.ts'
import { handleBadgeSkill } from '~/src/router/skill.ts'
import { handleStack } from '~/src/router/stack.ts'

const router = new Router()
router.get('/favicon.ico', handleFavicon)
router.get('/plain', handleBadgePlain)
router.get('/skill', handleBadgeSkill)
router.get('/stack', handleStack)

export default router
