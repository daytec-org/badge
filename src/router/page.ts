import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'

class Source {
  private _source: Record<string, string> = {}

  public get = (name: string): Promise<string> => {
    return new Promise(resolve => {
      if (this._source[name]) {
        resolve(this._source[name])
      } else {
        return Deno.readTextFile(`./src/client/${name}`)
          .then(data => {
            this._source[name] = data
            resolve(data)
          })
          .catch(error => {
            console.error(error instanceof Error ? error.message : error)
            resolve('')
          })
      }
    })
  }
}

const getSource = new Source().get

export async function handleMainPage({ request, response }: Context) {
  requestLog(`Main page`, request)

  const template = await getSource('index.html')
  const styles = await getSource('styles.css')
  const output = template.replace('/* css-outlet */', styles)

  response.type = 'text/html; charset=utf-8'
  response.body = output
}
