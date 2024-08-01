import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'
import Form from "./Form";
import JoblyApi from "../assets/api";

const SignUp = ({setToken}) => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await JoblyApi.registerUser(formData);
    setToken(token)
    setFormData(INITIAL_STATE)
    navigate('/home')
  }

  return(
    <div className="SignUp-div">
      <Form
        header="Sign Up"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        action='Sign Up'
      />
    </div>
  )
}

export default SignUp;