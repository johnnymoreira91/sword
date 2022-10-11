import NodeCache from 'node-cache'

class CacheService {
  private readonly ttl = 10 // default 60 seconds
  private dataCache = new NodeCache({ stdTTL: this.ttl, checkperiod: 120 })

  constructor () {
    this.dataCache.on('set', (key) => {
      console.log(key, 'insert')
    })

    this.dataCache.on('expired', (key) => {
      console.log(key, 'expired')
    })

    this.dataCache.on('del', async (key) => {
      console.log(key, 'del')
    })

    this.dataCache.on('flush', (key) => {
      console.log(key, 'flush')
    })
  }

  getCache (key: string) {
    return this.dataCache.get(key)
  }

  setCache (key: string, value: object, ttl = 30) {
    return this.dataCache.set(key, value, ttl)
  }

  delCacheKey (key: string) {
    return this.dataCache.del(key)
  }

  flushAll () {
    return this.dataCache.flushAll()
  }
}

export { CacheService }
