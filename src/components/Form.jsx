import FormComponent from "./FormComponent"
import Alert from '@mui/material/Alert';
import '../styles/Form.css'

const Form = ({alert, header, formData, setFormData, handleSubmit, action}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return(
    <div className="Form-div">
      <h3 className="Form-header">{header}</h3>
      <form className="Form-form" onSubmit={(e) => handleSubmit(e)}>
        {Object.entries(formData).map(([key, value]) => (
          <FormComponent
            key={key}
            header={header}
            name={key}
            value={value}
            handleChange={handleChange}
          />
        ))}
      { alert && <Alert className="Form-Alert" severity="success">Successfully Updated</Alert> }
      <button className="Form-btn">{action}</button>
    </form>
    </div>
  )
}

export default Form;