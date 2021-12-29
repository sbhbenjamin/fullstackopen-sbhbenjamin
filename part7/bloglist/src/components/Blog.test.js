import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'test blog',
    author: 'john doe',
    likes: 5,
    url: 'http://testblog.com'
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('john doe')
  const likes = component.queryByText('5')
  expect(likes).toBeNull()
  const url = component.queryByText('http://testblog.com')
  expect(url).toBeNull()
})

test('url and likes are shown upon pressing view', () => {
  const blog = {
    title: 'test blog',
    author: 'john doe',
    likes: 5,
    url: 'http://testblog.com',
    user: {
      name: 'john doe'
    }
  }

  const component = render(<Blog blog={blog} />)

  const view =  component.getByText('view')
  fireEvent.click(view)

  expect(component.container).toHaveTextContent('5')
  expect(component.container).toHaveTextContent('http://testblog.com')
})

test('if like button is clicked twice, event handler is called twice', () => {
  const blog = {
    title: 'test blog',
    author: 'john doe',
    likes: 5,
    url: 'http://testblog.com',
    user: {
      name: 'john doe'
    }
  }
  const mockLikeHandler = jest.fn()

  const component = render(<Blog blog={blog} handleUpdate={mockLikeHandler} />)

  const view =  component.getByText('view')
  fireEvent.click(view)

  const like = component.getByText('like')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})