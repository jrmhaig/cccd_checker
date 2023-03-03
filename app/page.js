async function pingEnvironment(host) {
  const response = await fetch(
    `https://${host}/ping`,
    { next: { revalidate: 15 } }
  )
  const data = await response.json()
  return data
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
      <table className="govuk-table">
        <caption className="govuk-table__caption govuk-table__caption--m">CCCD Environment status</caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th scope="col" className="govuk-table__header">Environment</th>
            <th scope="col" className="govuk-table__header">Branch</th>
            <th scope="col" className="govuk-table__header">Build date</th>
            <th scope="col" className="govuk-table__header">Commit id</th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {data.map((row, id) => (
            <tr key={id} className="govuk-table__row">
              <th scope="row" className="govuk-table__header">{row.environment}</th>
              <td className="govuk-table__cell">{row.app_branch}</td>
              <td className="govuk-table__cell">{row.build_date}</td>
              <td className="govuk-table__cell">{row.commit_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
