import React from "react"
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [data, setData] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setInputValue(() => e.target.value)
  }

  return (
    <div className="App">
      <h1>Teacher Portal</h1>
      <h2>Student List</h2>
      <div>{!data ? "Loading..." : data.map(data => (
        <div>
        <p>{data.name}</p>
        </div>
    ))}</div>
          
      <form onSubmit={handleSubmit}>
        <h2>Enter info</h2>
        <label>
          Name: 
          <input type='text' value={inputValue} name='name' onChange={handleChange} />
        </label>
        <input type='submit' value='submit' />
      </form>
    </div>
  );
}

export default App;
