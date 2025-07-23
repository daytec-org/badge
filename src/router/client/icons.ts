import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import { getSource } from '~/src/utils/getSource.ts'

export async function handleIcons({ request, response }: Context) {
  console.log(request.url)
  // response.type = 'text/html; charset=utf-8'
  // response.body = html
}
