import React from "react"
import './AddForm.css'

const AddForm = ({ textBox, element, boxOneLabel, boxTwoLabel, handleFirstChange, handleSecondChange,handleFocus, button }) => {
  if (textBox === 1) {
    return (
      <form>
        <label htmlFor={element.id}>{boxOneLabel}</label>
        <input type='text'
         name={element.id}
         onChange={handleFirstChange}
         key={element.id}
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
         onChange={handleFirstChange}
         key={element.id}
         onFocus={handleFocus}
        />
        <label htmlFor={`secondInput${element.id}`}>{boxTwoLabel}</label>
        <input type='text'
         name={`secondInput${element.id}`}
         onChange={handleSecondChange}
        />
        {button}
      </form>
    )
  }
}

export default AddForm;