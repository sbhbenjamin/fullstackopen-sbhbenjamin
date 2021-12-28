import anecdoteService from '../services/anecdotes'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const newAnecdotes = state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          anecdote.votes++
        }
        return anecdote
      })
      newAnecdotes.sort((a, b) => b.votes - a.votes)
      return newAnecdotes
    default:
      return state
  }
}

export const initialiseAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    // fetch all anecdotes from the server
    const anecdotes = await anecdoteService.getAll()

    // dispatches to the action, which adds them to the store
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })

    dispatch({
      type: 'VOTE_ANECDOTE',
      data: {
        id: anecdote.id,
      },
    })
  }
}

export default noteReducer
