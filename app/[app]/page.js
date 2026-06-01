import Link from 'next/link'
import AppFinder from '@/utils/AppFinder'
import Pinger from '@/utils/Pinger'
import Breadcrumbs from '@/components/Breadcrumbs'

function Error({ message, crumbs }) {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Error</h1>
            <p>{message}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default async function AppHome({ params }) {
  const app = AppFinder(params.app)

  if (!app) {
    return Error({
      message: `Unknown application: ${params.app}`,
      crumbs: [{ label: 'Home', url: '/' }],
    })
  }

  const pinger = new Pinger({ app: app })

  const data = await Promise.all(
    Object.keys(app.environments).map(async (key) => await pinger.call(key))
  )

  return (
    <>
      <Breadcrumbs crumbs={[{ label: 'Home', url: '/' }]} />

      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">{app.name}</h1>
            <table className="govuk-table">
              <caption className="govuk-table__caption govuk-table__caption--m">Branches of each environments</caption>
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th className="govuk-table__header">Environment</th>
                  <th className="govuk-table__header">Branch</th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                {data.map((row, id) => <tr className="govuk-table__row" key={id}>
                  <td className="govuk-table__cell">
                    <Link href={`${app.key}/${row.key()}`}>{row.environment()}</Link>
                  </td>
                  <td className="govuk-table__cell">
                    {row.app_branch()} ({row.commit_id()?.substr(0, 6)})
                  </td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
