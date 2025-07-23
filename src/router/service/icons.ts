import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import { iconList } from '~/src/utils/iconList.ts'

export async function handleIconList({ request, response }: Context) {
  requestLog(`Icon list`, request)

  const icons = await iconList.get()
  response.type = 'application/json'
  response.body = Array.from(icons)
}
