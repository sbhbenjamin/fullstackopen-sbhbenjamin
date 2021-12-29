import React, { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    handleCreateBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlog}>
      <div className='block'>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          className='input is-normal'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='block'>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          className='input is-normal'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className='block'>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          className='input is-normal'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div className='block'>
        <button type="submit" className='button is-success'>create</button>
      </div>
    </form>
  )
}

export default BlogForm
