import { bundle } from '@deno/emit'

const scr = ['html', 'js', 'css']

class Source {
  private _source: Record<string, string> = {}

  public get = (filename: string): Promise<string> => {
    return new Promise(resolve => {
      const DEV_MODE = Boolean(Deno.env.get('DEV_MODE'))

      if (!DEV_MODE && this._source[filename]) {
        // if (this._source[filename]) {
        resolve(this._source[filename])
      } else {
        const [name, ext] = filename.split('.')
        const path = scr.includes(ext) ? './src/client' : './public'

        if (ext === 'js') {
          return bundle(`${path}/${name}.ts`)
            .then(result => resolve(result.code))
            .catch(error => {
              console.error(error instanceof Error ? error.message : error)
              resolve('')
            })
        }

        return Deno.readTextFile(`${path}/${filename}`)
          .then(data => {
            if (scr.includes(ext)) this._source[filename] = data
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
