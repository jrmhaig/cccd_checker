export default class Pinger {
  constructor({ app }) {
    this.app = app
  }

  async call(environment) {
    const envData = this.app.environments[environment]

    if (!envData) { return null }

    const start = performance.now()
    const response = await fetch(
      `https://${envData.host}/ping`,
      { next: { revalidate: 15 } }
    )
    const data = await response.json()
    data['build_date'] = new Date(data['build_date'])
    return {
      response_time: (performance.now() - start),
      ...envData.defaults,
      ...data
    }
  }
}