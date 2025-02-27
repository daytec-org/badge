import { bundle } from '@deno/emit'

class Source {
  private _source: Record<string, string> = {}

  public get = (name: string): Promise<string> => {
    return new Promise(resolve => {
      if (this._source[name]) {
        resolve(this._source[name])
      } else {
        if (name.endsWith('.js')) {
          return bundle(`./src/client/${name.split('.')[0]}.ts`)
            .then(result => resolve(result.code))
            .catch(error => {
              console.error(error instanceof Error ? error.message : error)
              resolve('')
            })
        }

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

export const getSource = new Source().get
