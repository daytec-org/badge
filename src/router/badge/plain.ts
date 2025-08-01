import { type Context } from 'jsr:@oak/oak/'
import { badgePlain } from '~/src/badge/plain.ts'

export async function handleBadgePlain({ request, response }: Context) {
  const title = request.url.searchParams.get('title') ?? undefined
  const color = request.url.searchParams.get('color') ?? undefined
  const icon = request.url.searchParams.get('icon') ?? undefined
  const value = request.url.searchParams.get('value') ?? undefined

  response.type = 'image/svg+xml; charset=utf-8'
  response.body = await badgePlain({ title, color, icon, value })
}
