import React from "react"

const Header = ({ course }) => {
  return <h2>{course.name}</h2>
}

const Total = ({ course }) => {
  const sum = course.parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return course.parts.map((part) => <Part part={part} key={part.id} />)
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course
