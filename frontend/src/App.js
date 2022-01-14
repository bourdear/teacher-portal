import React from "react"
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then(res => (
        res.json())
      )
      .then((data) => {
        setApiData(data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setInputValue(() => e.target.value)
  } 

  return (
    <div className="App">
      <h1>Teacher Portal</h1>
      <h2>Class List</h2>
      {apiData && apiData.map((element) => (
        <div key={element.id}>
          <h3>{element.className}</h3>
          {element.students.map((student) => (
            <p key={student.id}>{student.name}</p>
          ))}
        </div>
      ))}
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
