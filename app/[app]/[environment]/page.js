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

export default async function Page({ params }) {
  const app = AppFinder(params.app)
  let crumbs = [{ label: 'Home', url: '/' }]

  if (!app) {
    return Error({ message: `Unknown application: ${params.app}`, crumbs: crumbs })
  }

  crumbs.push({ label: app.name, url: `/${app.key}` })
  const pinger = new Pinger({ app: app })
  const data = await pinger.call(params.environment)

  if (!data) {
    return Error({ message: `Unknown environment: ${params.environment}`, crumbs: crumbs })
  }

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />

      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">{app.name} {data.environment} status</h1>

            <table className="govuk-table">
              <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header">Branch</th>
                  <td className="govuk-table__cell">
                    <Link href={`https://github.com/${app.github}/tree/${data.app_branch}`}>
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
                    <Link href={`https://github.com/${app.github}/commit/${data.commit_id}`}>
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
          </div>
        </div>
      </main>
    </>
  )
}
