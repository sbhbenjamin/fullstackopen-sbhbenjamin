import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form sends correct details', () => {

  const mockBlogHandler = jest.fn()

  const component = render(<BlogForm handleCreateBlog={mockBlogHandler} />)

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('input[name="Title"]')
  fireEvent.change(title, {
    target: { value: 'sample blog' }
  })
  const author = component.container.querySelector('input[name="Author"]')
  fireEvent.change(author, {
    target: { value: 'john doe' }
  })
  const url = component.container.querySelector('input[name="Url"]')
  fireEvent.change(url, {
    target: { value: 'http://www.john.com' }
  })
  fireEvent.submit(form)

  expect(mockBlogHandler.mock.calls).toHaveLength(1)
  expect(mockBlogHandler.mock.calls[0][0].title).toBe('sample blog')
  expect(mockBlogHandler.mock.calls[0][0].author).toBe('john doe')
  expect(mockBlogHandler.mock.calls[0][0].url).toBe('http://www.john.com')

})