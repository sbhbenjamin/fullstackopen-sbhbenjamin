import React, { useState } from "react"

const Button = ({ btnName, btnHandler, state }) => {
  return <button onClick={() => btnHandler(state + 1)}>{btnName}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all} />
        <StatisticLine text="positive" value={`${(100 * good) / all} %`} />
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button btnName="good" btnHandler={setGood} state={good} />
      <Button btnName="neutral" btnHandler={setNeutral} state={neutral} />
      <Button btnName="bad" btnHandler={setBad} state={bad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App
