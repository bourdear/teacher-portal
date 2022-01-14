import React from "react"
import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [classData, setClassData] = useState([])
  const [inputValue, setInputValue] = useState('')

  const createClassObject = (data) => {
    for(let i = 0; i < data.length; i++) {
        const  classObject= {
          'id': data[i].id,
          'className': data[i].className,
          'show': false,
          'students': data[i].students
        }
        setClassData(classData => [...classData, classObject])
    }
  }

  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then(res => (
        res.json())
      )
      .then((data) => {
        createClassObject(data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  //Creates a deep copy and reverses the "show" boolean. 
  const handleClick = (e) => {
    const index = e.target.id - 1
    const arrCopy = JSON.parse(JSON.stringify(classData))
    arrCopy[index].show = !arrCopy[index].show
    setClassData(arrCopy)
  }

  const handleChange = (e) => {
    setInputValue(() => e.target.value)
  } 

  return (
    <div className="App">
      <h1>Teacher Portal</h1>
      <h2>Class List</h2> 
      {classData && classData.map((element) => (
        <div key={element.id}>
          <h3 onClick={handleClick} id={element.id}>{element.className}</h3>
          {element.show && element.students.map((student) => (
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
