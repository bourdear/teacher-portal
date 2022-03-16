import React from "react"
import './AddForm.css'

const AddForm = ({ inputName, labelText, inputValue, handleChange, handleFocus }) => (
    <form>
      <label htmlFor={inputName}>{labelText}</label>
      <input type='text'
      name={inputName}
      value={inputValue}
      onFocus={handleFocus}
      onChange={handleChange}
      />
    </form>
  )
 
export default AddForm;