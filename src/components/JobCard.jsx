import '../styles/JobCard.css'
import { useState, useEffect } from 'react';

const JobCard = ({ user, id, title, companyHandle, salary, equity, apply }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.applications) {
      setApplied(user.applications.includes(id));
      setLoading(false);
    }
  }, [user, id]);

  return (
    <div className="JobCard">
      <h4 className='JC-header'>{title}</h4>
      <p className='JC-p'>{companyHandle}</p>
      <div className='JC-small'>
        <small>Salary: {salary}</small>
      </div>
      <div className='JC-small'>
        <small>Equity: {equity}</small>
      </div>
      <div className='JC-div'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          applied ? (
            <button 
              className='JC-btn applied'
              disabled={true}
            >
              Applied
            </button>
          ) : (
            <button 
              className='JC-btn'
              onClick={() => apply(id)}
            >
              Apply
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default JobCard;
