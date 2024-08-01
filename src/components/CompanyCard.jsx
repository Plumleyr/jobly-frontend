import '../styles/CompanyCard.css'

const CompanyCard = ({name, description}) => {
  return(
    <div className="CompanyCard">
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  )
}

export default CompanyCard;