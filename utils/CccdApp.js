export const CccdApp = {
  key: 'cccd',
  name: 'Claim for Crown Court Defence',
  github: 'ministryofjustice/Claim-for-Crown-Court-Defence',
  environments: {
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
    }
  }
}