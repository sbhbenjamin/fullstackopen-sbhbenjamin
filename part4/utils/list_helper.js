// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

// returns the blog with the most number of likes
const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current
  }

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)
}

// // returns the author who has the largest amount of blogs
// const mostBlogs = (blogs) => {
//   // const blog = _.chain(blogs).countBy(blogs)
// }

module.exports = {
  dummy, totalLikes, favoriteBlog
}