import Link from 'next/link'
import { pingEnvironment } from '@/utils/pingEnvironment'

export default async function Page({ params }) {
  const data = await pingEnvironment(params.environment)

  if (!data) {
    return (
      <>
        <h1 className="govuk-heading-xl">Error</h1>
        <p>Unknown environment: {params.environment}</p>
      </>
    )
  }

  return (
    <>
      <h1 className="govuk-heading-xl">CCCD {data.environment} status</h1>

      <table className="govuk-table">
        <tbody className="govuk-table__body">
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Branch</th>
            <td className="govuk-table__cell">
              <Link href={`https://github.com/ministryofjustice/Claim-for-Crown-Court-Defence/tree/${data.app_branch}`}>
                {data.app_branch}
              </Link>
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Build date</th>
            <td className="govuk-table__cell">{data.build_date.toLocaleString('en-GB')}</td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Commit id</th>
            <td className="govuk-table__cell">
              <Link href={`https://github.com/ministryofjustice/Claim-for-Crown-Court-Defence/commit/${data.commit_id}`}>
                {data.commit_id}
              </Link>
            </td>
          </tr>
          <tr className="govuk-table__row">
            <th scope="row" className="govuk-table__header">Response time</th>
            <td className="govuk-table__cell">{Math.round(data.response_time * 100) / 100} ms</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
