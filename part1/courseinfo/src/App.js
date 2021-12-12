import React from "react"

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}
const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
