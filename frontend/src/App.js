import React from "react"
import { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import Button from './components/Button'
import './App.css';

function App() {
  const [apiData, setApiData] = useState([])
  const [classData, setClassData] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [formIndex, setFormIndex] = useState('')

  const createClassObject = data => {
    for(let i = 0; i < data.length; i++) {
        const  classObject= {
          'id': data[i].id,
          'className': data[i].className,
          'show': false,
          'showStudentForm': false,
          'students': data[i].students
        }
        setClassData(classData => [...classData, classObject])
    }
  }

  const resetForm = () => {
    setFirstName('')
    setLastName('')
  }

  const updateClassObject = (studentObject, index) => {
    const arrCopy = JSON.parse(JSON.stringify(classData))
    arrCopy[index].students.push(studentObject)
    arrCopy[index].showStudentForm = false
    setClassData(arrCopy)
    resetForm()
  }

  const addStudent = () => {
    const newStudent = `${firstName} ${lastName}`
    const apiCopy = JSON.parse(JSON.stringify(apiData))
    const studentObject = {
      'id': apiCopy[formIndex].students.length + 1,
      'name': newStudent,
      'test-grades': []
    }
    apiCopy[formIndex].students.push(studentObject)
    setApiData(() => apiCopy)
    updateClassObject(studentObject, formIndex)
    return apiCopy
  }

  const sendData = async (e) => {
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      console.log('no name found')
      return
    }
    const sendData = await addStudent()
    fetch(`http://localhost:3001/api`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData, null, 2)
    })
    console.log('Data Sent')
  }

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => (
        res.json())
      )
      .then((data) => {
        setApiData(data)
        createClassObject(data)
      })
  }, [])

  //Creates a deep copy and reverses the "show" boolean. 
  const reverseShow = (e) => {
    const index = e.target.id - 1
    const arrCopy = JSON.parse(JSON.stringify(classData))
    for(let i=0; i<arrCopy.length; i++) {
      if(arrCopy[i] !== arrCopy[index])
      arrCopy[i].show = false
      arrCopy[i].showStudentForm = false
    }
    arrCopy[index].show = !arrCopy[index].show
    arrCopy[index].showStudentForm = false
    setClassData(arrCopy)
  }

  const displayStudentForm = e => {
    const index = e.target.name - 1
    const arrCopy = JSON.parse(JSON.stringify(classData))
    arrCopy[index].showStudentForm = !arrCopy[index].showStudentForm
    setClassData(arrCopy)
  }

  const handleFirstName = e => {
    setFirstName(() => e.target.value)
  } 

  const handleLastName = e => {
    setLastName(() => e.target.value)
  }

  const handleFormIndex = e => {
    let index = e.target.name[e.target.name.length - 1]
    setFormIndex(index - 1)
  }

  return (
    <div className="App">
      <h1>Teacher Portal</h1>
      <hr />
      <h2>Class List</h2> 
      {classData && classData.map((element) => (
        <div key={element.id}>
          <h3 onClick={reverseShow} id={element.id} className='courses'>{element.className}</h3>
          {element.show && element.students.map((student) => (
              <p key={student.id}>{student.name}</p>
          ))}
          {element.show && 
            <Button type={'button'}
             value={'Add Student'}
             name={element.id}
             handleClick={displayStudentForm}
             />
          }
          {element.showStudentForm &&
            <AddForm textBox={2}
            element={element}
            boxOneLabel={'First Name:'}
            boxTwoLabel={'Last Name'}
            handleFirstChange={handleFirstName}
            handleSecondChange={handleLastName}
            handleFocus={handleFormIndex}
            button={<Button type={'button'} value={'Submit'} handleClick={sendData} />}
            />
          }
        </div>
      ))}
    </div>
  );
}

export default App;
