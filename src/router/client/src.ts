import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import { getSource } from '~/src/utils/getSource.ts'
import mime from '~/src/utils/mime.ts'

export async function handleSource({ request, response }: Context) {
  const file = request.url.pathname.split('/').pop()
  const ext = file?.split('.').pop()
  if (!file || !ext) {
    response.status = 400
    response.body = 'Wrong request'
    return
  }
  requestLog(file, request)

  const output = await getSource(file)

  response.type = mime(ext)
  response.body = output
}
