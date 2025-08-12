import { bundle, BundleOptions } from '@deno/emit'

const DEV_MODE = Boolean(Deno.env.get('DEV_MODE'))

function makeBundle(filename: string) {
  const [name] = filename.split('.')

  bundle(filename, {
    importMap: DEV_MODE ? './import-map.dev.json' : './import-map.prod.json',
    minify: true
  })
    .then(result => {
      Deno.writeTextFile(`${name}.js`, result.code)
        .then(() => {
          console.log(`${name}.js was successfully bundled`)
        })
        .catch(error => {
          console.error(error instanceof Error ? error.message : error)
        })
    })
    .catch(error => {
      console.error(error instanceof Error ? error.message : error)
    })
}

makeBundle('src/client/main.ts')
