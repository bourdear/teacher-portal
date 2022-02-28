import React from 'react'
import './Button.css'

const Button = ({ type, value, name, handleClick }) => (
  <input type={type}
   value={value} 
   name={name}
   onClick={handleClick}
   className='add-student'/>
)

export default Button;