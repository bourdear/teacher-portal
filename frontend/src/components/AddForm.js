import React from "react"
import './AddForm.css'

const AddForm = ({ textBox,
  element, 
  boxOneLabel,
  boxTwoLabel,
  course,
  firstName,
  lastName,
  handleFirstChange,
  handleSecondChange,
  handleFocus,
  button }) => {
    if (textBox === 1) {
      return (
        <form>
          <label htmlFor={'newCourse'}>{boxOneLabel}</label>
          <input type='text'
           name={'newCourse'}
           value={course}
           onChange={handleFirstChange}
           onFocus={handleFocus}
          />
          {button}
        </form>
      )
    } else if (textBox === 2) {
      return (
        <form>
          <label htmlFor={`firstInput${element.id}`}>{boxOneLabel}</label>
          <input type='text'
           name={`firstInput${element.id}`}
           value={firstName}
           onChange={handleFirstChange}
           key={element.id}
           onFocus={handleFocus}
          />
          <label htmlFor={`secondInput${element.id}`}>{boxTwoLabel}</label>
          <input type='text'
           name={`secondInput${element.id}`}
           value={lastName}
           onChange={handleSecondChange}
          />
          {button}
        </form>
      )
    }
}

export default AddForm;