import { Router } from 'jsr:@oak/oak/router'
import { favicon } from '~/src/router/favicon.ts'
import { plain } from '~/src/router/plain.ts'
import { skill } from '~/src/router/skill.ts'

const router = new Router()
router.get('/favicon.ico', favicon)
router.get('/plain', plain)
router.get('/skill', skill)

export default router
