import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'
import { getSource } from '~/src/utils/getSource.ts'

export async function handleMainPage({ request, response }: Context) {
  requestLog(`Main page`, request)

  const html = await getSource('index.html')
  // const styles = await getSource('styles.css')
  // const output = html.replace('/* css-outlet */', styles)

  response.type = 'text/html; charset=utf-8'
  response.body = html
}
