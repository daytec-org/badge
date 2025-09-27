import { Router } from 'jsr:@oak/oak/router'
import { handleMainPage } from '~/src/router/client/page.ts'
import { handleFavicon } from '~/src/router/client/favicon.ts'
import { handleSource } from '~/src/router/client/src.ts'
import { handleImage } from './client/image.ts'
import { handleIconList } from '~/src/router/service/icons.ts'
import { handleLogs } from './service/logs.ts'
import { badgeRoutes } from './badgeRoutes.ts'

const router = new Router()

badgeRoutes.forEach(route => {
  router[route.method](route.path, route.handler(route.props))
})
// Services
router.get('/icons', handleIconList)
router.get('/logs/:level', handleLogs)
router.get('/error', () => {
  throw Error('Example exception')
})
// Main page
router.get('/', handleMainPage)
router.get('/favicon.ico', handleFavicon)
router.get('/:file', handleSource)
router.get('/img/:file', handleImage)

export default router
