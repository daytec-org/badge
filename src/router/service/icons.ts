import { type Context } from 'jsr:@oak/oak/'
import { iconList } from '~/src/utils/iconList.ts'

export async function handleIconList({ request, response }: Context) {
  const icons = await iconList.get()
  response.type = 'application/json'
  response.body = Array.from(icons)
}
