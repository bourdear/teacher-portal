import React from "react"
import { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import Button from './components/Button'
import Course from './components/Course'
import './App.css';

function App() {
  const [apiData, setApiData] = useState([])
  const [classData, setClassData] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [courseForm, setCourseForm] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [formIndex, setFormIndex] = useState('')

  const classObj = (data, index) => {
    if (data.length > 1) {
      return (
        {
          'id': data[index].id,
          'className': data[index].className,
          'show': false,
          'showStudentForm': false,
          'students': data[index].students
        }
    )} else {
      return (
        {
        'id': data.id,
        'className': data.className,
        'show': false,
        'showStudentForm': false,
        'students': data.students
        }
      )
    }
  }

  const createClassObject = data => {
    for(let i = 0; i < data.length; i++) {
        const classObject= classObj(data, i)
        setClassData(classData => [...classData, classObject])
    }
  }

  const resetStudentForm = () => {
    setFirstName('')
    setLastName('')
  }

  const updateCourse = (data) =>  {
    const classObject = classObj(data, 0)
    setClassData(classData => [...classData, classObject])
    setCourseName(() => '')
  }

  const updateStudentList = (studentObject, index) => {
    const arrCopy = JSON.parse(JSON.stringify(classData))
    arrCopy[index].students.push(studentObject)
    arrCopy[index].showStudentForm = false
    setClassData(arrCopy)
    resetStudentForm()
  }

  const handlePut = (data) => {
    fetch(`http://localhost:3001/api`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data, null, 2)
    })
    console.log('data sent')
  }

  const addCourse = courseName => {
    const apiCopy = JSON.parse(JSON.stringify(apiData))
    const classObject = {
      'className': courseName,
      'id': classData.length + 1,
      'students': []
    }
    apiCopy.push(classObject)
    setApiData(() => apiCopy)
    updateCourse(classObject)
    return apiCopy
  }

  const sendCourseData = async (e) => {
    e.preventDefault()
    if (courseName === '') {
      console.log('no course found')
      return
    }
    const newCourseData = await addCourse(courseName)
    handlePut(newCourseData)
    setCourseName('')
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
    updateStudentList(studentObject, formIndex)
    return apiCopy
  }

  const sendStudentData = async (e) => {
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      console.log('no name found')
      return
    }
    const newStudentData = await addStudent()
    handlePut(newStudentData)
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

  const expandCourseForm  = e => {
    setCourseForm(!courseForm)
  }

  const handleFirstName = e => {
    setFirstName(() => e.target.value)
  } 

  const handleLastName = e => {
    setLastName(() => e.target.value)
  }

  const handleCourseName = e => {
    setCourseName(() => e.target.value)
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
          <Course handleClick={reverseShow} element={element} />
          {element.show && !element.showStudentForm &&
            <Button value={'Add Student'}
             name={element.id}
             handleClick={displayStudentForm}
             />
          }
          {element.showStudentForm &&
            <AddForm textBox={2}
            element={element}
            firstName={firstName}
            lastName={lastName}
            boxOneLabel={'First Name:'}
            boxTwoLabel={'Last Name'}
            handleFirstChange={handleFirstName}
            handleSecondChange={handleLastName}
            handleFocus={handleFormIndex}
            button={<Button value={'Submit'} handleClick={sendStudentData} />}
            />
          }
        </div>
      ))}
      {!courseForm && 
        <Button value={'Add Class'} handleClick={expandCourseForm} />
      }
        {courseForm &&
      <AddForm textBox={1}
        boxOneLabel={'Add Class: '}
        handleFirstChange={handleCourseName}
        course={courseName}
        button={<Button value={'Submit'} handleClick={sendCourseData} />}
      />}
    </div>
  );
}

export default App;
