import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COMMENT':
    return [...state, action.data]
  case 'GET_COMMENTS':
    return action.data
  default:
    return state
  }
}

export const createComment = (comment) => {
  return async dispatch => {
    const newComment = await commentService.createComment(comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}

export const getBlogComments = (blog) => {
  return async dispatch => {
    const comments = await commentService.getBlogComments(blog)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export default commentReducer