import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import JoblyApi from '../assets/api';
import '../styles/JobList.css'
import JobCard from './JobCard';

const JobList = ({user, applyToJob}) => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!user){
      navigate('/home')
    }
  })

  useEffect(() => {
    const fetchAndLoad = async () => {
      try{
        const jobs = await JoblyApi.getAllJobs()
        setJobs(jobs)
        setLoading(false)
      } catch (err) {
        setError(err)
      }
    }
    fetchAndLoad()
  }, []);

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    let result = await JoblyApi.getAllJobs({title: term});
    setJobs(result);
    setTerm('');
    setLoading(false)
  }

  return(
    <div className='JobList'>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className="JL-form-div">
        <form className="JL-form" onSubmit={handleSubmit}>
          <input 
            className="JL-input"
            name="search"
            type="text" 
            value={term}
            onChange={handleChange}
            placeholder="Enter Search Term ..."
          />
          <button className="JL-btn">Search</button>
        </form>
      </div>

      <div className='JL-Cards' style={{marginTop: '16px'}}>
        {jobs.length === 0 && !loading && !error && <div>No jobs found</div>}
        {jobs.map((j, idx )=> (
          <JobCard
            user={user}
            key={idx}
            id={j.id}
            title={j.title}
            companyHandle={j.companyHandle}
            salary={j.salary}
            equity={j.equity}
            apply={applyToJob}
          />
        ))}
      </div>
    </div>
  )
}

export default JobList;