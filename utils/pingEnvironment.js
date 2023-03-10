export async function pingEnvironment(envName) {
  const environments = {
    'production': {
      host: 'claim-crown-court-defence.service.gov.uk',
      defaults: {
        environment: 'Production',
        key: 'production'
      }
    },
    'staging': {
      host: 'staging.claim-crown-court-defence.service.justice.gov.uk',
      defaults: {
        environment: 'Staging',
        key: 'staging'
      }
    },
    'api-sandbox': {
      host: 'api-sandbox.claim-crown-court-defence.service.justice.gov.uk',
      defaults: {
        environment: 'API Sandbox',
        key: 'api-sandbox'
      }
    },
    'dev': {
      host: 'dev.claim-crown-court-defence.service.justice.gov.uk',
      defaults: {
        environment: 'Dev',
        key: 'dev'
      }
    },
    'dev-lgfs': {
      host: 'dev-lgfs.claim-crown-court-defence.service.justice.gov.uk',
      defaults: {
        environment: 'Dev LGFS',
        key: 'dev-lgfs'
      }
    },
  }

  const environment = environments[envName]

  if (!environment) { return null }

  const start = performance.now()
  const response = await fetch(
    `https://${environment.host}/ping`,
    { next: { revalidate: 15 } }
  )
  const data = await response.json()
  data['build_date'] = new Date(data['build_date'])
  return {
    response_time: (performance.now() - start),
    ...environment.defaults,
    ...data
  }
}