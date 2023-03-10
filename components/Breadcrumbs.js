export default function Breadcrumbs(params) {
  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {params.crumbs.map((crumb, key) => (
          <li className="govuk-breadcrumbs__list-item" key={key}>
            <a className="govuk-breadcrumbs__link" href={crumb.url}>{crumb.label}</a>
          </li>
        ))}
      </ol>
    </div>
  )
}