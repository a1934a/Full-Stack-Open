import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Dp = ({ anecdote, vote }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {vote} {vote === 1 || vote === 0 ? 'vote' : 'votes'}</p>
  </div>
)

const Display = ({ votes, index }) => {
  const anecdote = anecdotes[index]
  const vote = votes[index]
  return (
    <Dp anecdote={anecdote} vote={vote} />
  )
}

const App = () => {

  const getRandomIndex = () => {
    const i = Math.floor(Math.random() * anecdotes.length)
    console.log("got random", i)
    return i
  }

  const nextAnecdote = () => {
    setSelected(getRandomIndex())
  }

  const upvote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  const [selected, setSelected] = useState(getRandomIndex)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const maxVotes = Math.max(...votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display votes={votes} index={selected} />
      <button onClick={upvote}>vote</button>
      <button onClick={nextAnecdote}>next anecodte</button>
      <h1>Anecdote with most votes</h1>
      <Display votes={votes} index={votes.indexOf(maxVotes)} />
    </div>
  )
}

export default App