import PingResult from './PingResult'

export default class Pinger {
  constructor({ app }) {
    this.app = app
  }

  async call(environment) {
    const envData = this.app.environments[environment]
    if (!envData) { return null }

    const start = performance.now()
    return new PingResult({
      response_time: (performance.now() - start),
      defaults: envData.defaults,
      data: await this.fetch(envData.host)
    })
  }

  async fetch(host) {
    const response = await fetch(
      `https://${host}/ping`,
      { next: { revalidate: 15 } }
    )
    // It should be possible to check response.status but there is a bug in 
    // next.js' version of fetch. This may be fixed in version 13.2.5.
    // See https://github.com/vercel/next.js/issues/46621
    try {
      return await response.json()
    } catch (error) {
      return {}
    }
  }
}