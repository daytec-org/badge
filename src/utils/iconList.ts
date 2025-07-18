class IconList {
  private cache = new Set<string>()

  public async get() {
    if (this.cache.size === 0) {
      await this.generate()
    }
    return this.cache
  }

  private generate = async () => {
    for await (const dirEntry of Deno.readDir('./public/icons/')) {
      if (dirEntry.isFile && dirEntry.name.endsWith('.svg')) {
        this.cache.add(dirEntry.name.slice(0, -4))
      }
    }
  }
}

const iconList = new IconList()
export { iconList }
