import Link from 'next/link'

export default async function Home() {

  return (
    <>
      <main className="govuk-main-wrapper">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-xl">Environment Checker</h1>
            <p><Link href="/cccd">Claim for Crown Court Defence</Link></p>
            <p><Link href="/cdui">View Court Data</Link></p>
          </div>
        </div>
      </main>
    </>
  )
}
