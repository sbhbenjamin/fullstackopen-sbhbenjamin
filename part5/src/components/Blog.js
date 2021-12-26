import React, { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove }) => {
  const [expand, setExpand] = useState(false)

  const handleLike = async () => {
    handleUpdate({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  return (
    <div data-testid='blog' className="blog" >
      <span data-testid='blog-title'>{blog.title}</span> <span data-testid='blog-author'>{blog.author}</span>
      <button onClick={() => setExpand(!expand)} data-testid='toggle-blog'>
        {expand ? 'hide' : 'view'}
      </button>
      {expand && (
        <>
          <div data-testid='blog-url'>{blog.url}</div>
          <div data-testid='blog-likes'>
            {blog.likes} <button data-testid='blog-like-button' onClick={handleLike}>like</button>
          </div>
          <div data-testid='blog-user'>{blog.user.name}</div>
        </>
      )}
      {window.localStorage.getItem('loggedBlogappUser') !== null &&
        JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
          .username === blog.user.username && (
        <button data-testid='blog-delete-button' onClick={() => handleRemove(blog)}>remove</button>
      )}
    </div>
  )
}

export default Blog
