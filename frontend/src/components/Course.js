import './Course.css'

const Course = ({ handleClick, element }) => (
  <div>
    <h3 onClick={handleClick} id={element.id} className='courses'>{element.className}</h3>
    <div>
      {element.show && element.students.map((student) => (
        <p key={student.id}>{student.name}</p>
      ))}
    </div>
  </div>
)

export default Course;