class Icons {
  private _icons: Record<string, string> = {}

  public get = (name: string): Promise<string> => {
    return new Promise(resolve => {
      if (this._icons[name]) {
        resolve(this._icons[name])
      } else {
        return Deno.readTextFile(`./public/icons/${name}.svg`)
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

const getIcon = new Icons().get
export default getIcon
