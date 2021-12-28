import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

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
  const goodHandler = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const okHandler = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const badHandler = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetHandler = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  const all = store.getState().good + store.getState().ok + store.getState().bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button btnName="good" btnHandler={goodHandler} state={store.getState().good} />
      <Button btnName="neutral" btnHandler={okHandler} state={store.getState().ok} />
      <Button btnName="bad" btnHandler={badHandler} state={store.getState().bad} />
      <Button btnName="reset" btnHandler={resetHandler} />
      <Statistics good={store.getState().good} neutral={store.getState().ok} bad={store.getState().bad} all={all} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
