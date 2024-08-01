import CompanyCard from "./CompanyCard";
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import JoblyApi from '../assets/api'
import '../styles/CompanyList.css'

const CompanyList = ({user}) => {

  const navigate = useNavigate();
  
  if(!user){
    navigate('/home')
  }

  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [term, setTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAndLoad = async () => {
      try{
        const result = await JoblyApi.getAll()
        setCompanies(result)
        setLoading(false)
      } catch (err) {
        setError(err)
      }
    }
    fetchAndLoad()
  }, [])

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    let result = await JoblyApi.getAll({name: term});
    setCompanies(result);
    setTerm('');
    setLoading(false)
  }


  return(
    <div className="CompanyList">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className="CL-form-div">
        <form className="CL-form" onSubmit={handleSubmit}>
          <input 
            className="CL-input"
            name="search"
            type="text" 
            value={term}
            onChange={handleChange}
            placeholder="Enter Search Term ..."
          />
          <button className="CL-btn">Search</button>
        </form>
      </div>


      <div style={{marginTop: '16px'}}>
        {companies.length === 0 && !loading && !error && <div>No companies found</div>}
        {companies.map(c => (
          <Link className="CompanyList-Link" key={c.name} to={`/companies/${c.handle}`}>
            <CompanyCard
              name={c.name}
              description={c.description}
            />
          </Link>
          ))}
      </div>
    </div>
  )
}

export default CompanyList;