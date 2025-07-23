import { Router } from 'jsr:@oak/oak/router'
import { handleMainPage } from '~/src/router/client/page.ts'
import { handleFavicon } from '~/src/router/client/favicon.ts'
import { handleSource } from '~/src/router/client/src.ts'
import { handleBadgePlain } from '~/src/router/badge/plain.ts'
import { handleBadgeSkill } from '~/src/router/badge/skill.ts'
import { handleStack } from '~/src/router/badge/stack.ts'
import { handleIconList } from '~/src/router/service/icons.ts'

const router = new Router()
// Badges
router.get('/plain', handleBadgePlain)
router.get('/skill', handleBadgeSkill)
router.get('/stack', handleStack)
// Services
router.get('/icons', handleIconList)
// Main page
router.get('/', handleMainPage)
router.get('/favicon.ico', handleFavicon)
router.get('/:file', handleSource)

export default router
