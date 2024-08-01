import { useState, useEffect } from "react";
import '../styles/Profile.css'
import Form from "./Form";
import JoblyApi from "../assets/api";

const Profile = ({user, setUser}) => {
  
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    setFormData({
      username: user?.username || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await JoblyApi.updateUser(formData)
    setUser(updatedUser);
    setAlert(true);
    setFormData({})
  }

  return(
    <div className="Profile-div">
      <Form
        alert={alert}
        header="Profile"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        action='Update'
      />
    </div>
  )
  
}

export default Profile;