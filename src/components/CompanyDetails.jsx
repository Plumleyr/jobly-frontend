import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../styles/CompanyDetails.css'
import JoblyApi from '../assets/api'
import JobCard from './JobCard';

const CompanyDetails = ({user, applyToJob}) => {

  const navigate = useNavigate();
  if(!user){
    navigate('/home')
  }

  const {company} = useParams();
  const [details, setDetails] = useState({ jobs: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true)
        const details = await JoblyApi.getCompany(company)
        setDetails(details)
      } catch (err) {
        setError(err)
      } finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])


  return(
    <div className='CD-main'>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <h2 className='CD-h2'>{details.name}</h2>
      <h4 className='CD-h4'>{details.description}</h4>
      {details.jobs.map(j => (
        <JobCard
          user={user}
          key={j.title}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          apply={applyToJob}
        />
      ))}
    </div>
  )
}

export default CompanyDetails;