import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = ((good - bad) / all)
  const positive = (good / all)

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive" value={(positive * 100).toFixed(1) + ' %'} />
    </div>
  )
}

const StatisticRow = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
)

const StatisticsTable = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all)
  const positive = (good / all)

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticRow text="good" value={good} />
          <StatisticRow text="neutral" value={neutral} />
          <StatisticRow text="bad" value={bad} />
          <StatisticRow text="all" value={all} />
          <StatisticRow text="average" value={average.toFixed(2)} />
          <StatisticRow text="positive" value={(positive * 100).toFixed(1) + ' %'} />
        </tbody>
      </table>
    </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handle = (set, value) => () => set(value)
  const increment = a => a + 1
  const increase = (set) => handle(set, increment)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increase(setGood)} text="good"></Button>
      <Button handleClick={increase(setNeutral)} text="neutral"></Button>
      <Button handleClick={increase(setBad)} text="bad"></Button>
      <StatisticsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
