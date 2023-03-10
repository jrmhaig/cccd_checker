import Link from 'next/link'
import { pingEnvironment } from '@/utils/pingEnvironment'

export default async function Home() {

  const data = [
    await pingEnvironment('production'),
    await pingEnvironment('staging'),
    await pingEnvironment('api-sandbox'),
    await pingEnvironment('dev'),
    await pingEnvironment('dev-lgfs'),
  ]

  return (
    <>
      <table className="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--m">Branches on CCCD environments</caption>
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            <th className="govuk-table__header">Environment</th>
            <th className="govuk-table__header">Branch</th>
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {data.map((row, id) =>
            <tr className="govuk-table__row" key={id}>
              <td className="govuk-table__cell">
                <Link href={`cccd/${row.key}`}>{row.environment}</Link>
              </td>
              <td className="govuk-table__cell">
                {row.app_branch} ({row.commit_id.substr(0, 6)})
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}
