import React from 'react'
import './Button.css'

const Button = ({ value, name, handleClick }) => (
  <input type='button'
   value={value} 
   name={name}
   onClick={handleClick}
   className='add-student'/>
)

export default Button;