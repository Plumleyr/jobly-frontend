import '../styles/FormComponent.css'

const FormComponent = ({header, name, value, handleChange}) => {
  const labelName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="FC-div">
      <label
      className='FC-label'
        htmlFor={name}>
        {labelName}
      </label>
      <input
        className="FC-input"
        disabled={header === 'Profile' && name === 'username' ? true : false}
        name={name}
        type={name === 'password' ? 'password' : 'text'}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default FormComponent;