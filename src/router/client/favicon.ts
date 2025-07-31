import { type Context } from 'jsr:@oak/oak/'
import getIcon from '~/src/utils/getIcon.ts'

export async function handleFavicon({ response }: Context) {
  response.type = 'image/svg+xml; charset=utf-8'
  response.body = await getIcon('favicon')
}
