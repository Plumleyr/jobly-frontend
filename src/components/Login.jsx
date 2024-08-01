import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'
import Form from "./Form";
import JoblyApi from "../assets/api";

const Login = ({setToken}) => {
  const INITIAL_STATE = {
    username: '',
    password: ''
  }

  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await JoblyApi.loginUser(formData);
    setToken(token);
    setFormData(INITIAL_STATE);
    navigate('/home')
  }

  return(
    <div className="Login-div">
      <Form
        header="Log In"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        action='Login'
      />
    </div>
  )
}

export default Login;