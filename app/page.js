import Link from 'next/link'

async function pingEnvironment(host) {
  const start = performance.now()
  const response = await fetch(
    `https://${host}/ping`,
    { next: { revalidate: 15 } }
  )
  console.log(response)
  const data = await response.json()
  return { response_time: (performance.now() - start), ...data }
}

export default async function Home() {

  const data = [
    { environment: 'Production', ...await pingEnvironment('claim-crown-court-defence.service.gov.uk') },
    { environment: 'Staging', ...await pingEnvironment('staging.claim-crown-court-defence.service.justice.gov.uk') },
    { environment: 'API Sandbox', ...await pingEnvironment('api-sandbox.claim-crown-court-defence.service.justice.gov.uk') },
    { environment: 'Dev', ...await pingEnvironment('dev.claim-crown-court-defence.service.justice.gov.uk') },
    { environment: 'Dev LGFS', ...await pingEnvironment('dev-lgfs.claim-crown-court-defence.service.justice.gov.uk') },
  ]

  return (
    <>
      {data.map((row, id) =>
        <div key={id} className="govuk-summary-card">
          <div className="govuk-summary-card__title-wrapper">
            <h2 className="govuk-summary-card__title">{row.environment}</h2>
          </div>
          <div className="govuk-summary-card__content">
            <dl className="govuk-summary-list">
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  Branch
                </dt>
                <dd className="govuk-summary-list__value">
                  <Link href={`https://github.com/ministryofjustice/Claim-for-Crown-Court-Defence/tree/${row.app_branch}`}>
                    {row.app_branch}
                  </Link>
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  Build date
                </dt>
                <dd className="govuk-summary-list__value">
                  {row.build_date}
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  Commit id
                </dt>
                <dd className="govuk-summary-list__value">
                  <Link href={`https://github.com/ministryofjustice/Claim-for-Crown-Court-Defence/commit/${row.commit_id}`}>
                    {row.commit_id.substring(0, 6)}
                  </Link>
                </dd>
              </div>
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">
                  Response time
                </dt>
                <dd className="govuk-summary-list__value">
                  {Math.round(row.response_time * 100) / 100}ms
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </>
  )
}
