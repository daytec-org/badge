import { Application } from 'jsr:@oak/oak/application'
import { exceptionFilter, loggerMiddleware } from './src/router/middleware/logger.ts'
import router from '~/src/router/router.ts'

const PORT = Number(Deno.env.get('APP_PORT'))

const app = new Application()
app.use(exceptionFilter);
app.use(loggerMiddleware);
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: PORT, hostname: '127.0.0.1' })
console.log(`\x1b[33m  ➜ ✨ Server is listening on port: \x1b[96m${PORT}\x1b[0m`)
