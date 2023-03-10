export const CduiApp = {
  key: 'cdui',
  name: 'View Court Data',
  github: 'ministryofjustice/laa-court-data-ui',
  environments: {
    'production': {
      host: 'view-court-data.service.justice.gov.uk',
      defaults: {
        environment: 'Production',
        key: 'production'
      }
    },
    'staging': {
      host: 'staging.view-court-data.service.justice.gov.uk',
      defaults: {
        environment: 'Staging',
        key: 'staging'
      }
    },
    'uat': {
      host: 'uat.view-court-data.service.justice.gov.uk',
      defaults: {
        environment: 'UAT',
        key: 'uat'
      }
    },
    'dev': {
      host: 'dev.view-court-data.service.justice.gov.uk',
      defaults: {
        environment: 'Dev',
        key: 'dev'
      }
    }
  }
}