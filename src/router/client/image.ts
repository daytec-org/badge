import { type Context } from 'jsr:@oak/oak/'
import { requestLog } from '~/src/utils/log.ts'

class ClientIcons {
  private _icons: Record<string, string> = {}

  public get = (name: string): Promise<string> => {
    return new Promise(resolve => {
      if (this._icons[name]) {
        resolve(this._icons[name])
      } else {
        return Deno.readTextFile(`./public/ui/${name}`)
          .then(data => {
            this._icons[name] = data
            resolve(data)
          })
          .catch(() => {
            resolve('')
          })
      }
    })
  }
}

const getIcon = new ClientIcons().get

export async function handleImage({ request, response }: Context) {
  const img = request.url.pathname.split('/').pop()
  requestLog(`Image ${img}`, request)

  if (img) {
    response.type = 'image/svg+xml; charset=utf-8'
    response.body = await getIcon(img)
  }
}
