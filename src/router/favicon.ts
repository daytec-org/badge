import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import getIcon from '~/src/utils/getIcon.ts'

export async function favicon({ request, response }: Context) {
  requestLog('favicon', request)

  response.type = 'image/svg+xml; charset=utf-8'
  response.body = await getIcon('favicon')
}
