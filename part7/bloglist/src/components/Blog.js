import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useField } from '../hooks/index'
import { createComment, getBlogComments } from '../reducers/comment'

const Blog = ({ blogs, handleUpdate }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const comment = useField('text')
  const comments = useSelector(state => state.comments)

  useEffect(() => {
    dispatch(getBlogComments(blog))
  }, [])

  const handleLike = async () => {
    handleUpdate({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleCommentCreate = (e) => {
    e.preventDefault()
    dispatch(createComment({
      message: comment.value,
      blog: id
    }))
    comment.value = ''
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div className='block'>
        <div className='block'>
          <h1 className='is-size-3' >{blog.title}</h1>
        </div>
        <div className="block">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className='block'>
          {blog.likes} likes <button onClick={handleLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
      <div className='block box'>
        <h3>comments</h3>
        <form onSubmit={handleCommentCreate} className='field has-addons'>
          <div className="control is-expanded">
            <input {...comment} className='input'/>
          </div>
          <div className="control">
            <button className='button is-primary' type='submit' >add comment</button>
          </div>
        </form>
        {comments && <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.message}</li>
          ))}
        </ul>}
      </div>
    </div>
  )
}

export default Blog
