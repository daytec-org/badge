import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import getIcon from '~/src/utils/getIcon.ts'

export async function handleImage({ request, response }: Context) {
  requestLog('image', request)

  const img = request.url.pathname.split('/').pop()

  if (img) {
    response.type = 'image/svg+xml; charset=utf-8'
    response.body = await getIcon(img)
  }
}
