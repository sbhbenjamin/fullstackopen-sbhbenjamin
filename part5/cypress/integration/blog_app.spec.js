describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset') // reset db
    cy.visit('http://localhost:3000')

    // add a user
    const user = {
      name: 'john doe',
      username: 'john',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('john')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.get('#logout-button').click()
      cy.get('.success').should('contain', 'Successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'john', password: 'password' })

      cy.createBlog({
        title: 'blog from cypress',
        author: 'johnny',
        url: 'http://localhost:3000'
      })
    })
    

    it('A blog can be created', function() {
      cy.get('[data-testid="blog-title"]').should('contain', 'blog from cypress')
      cy.get('[data-testid="blog-author"]').should('contain', 'johnny')
    })

    it('A blog can be liked', function() {
      cy.get('[data-testid="toggle-blog"]').click()
      cy.get('[data-testid="blog-likes"]').should('contain', '0')
      cy.get('[data-testid="blog-like-button"]').click()
      cy.get('[data-testid="blog-likes"]').should('contain', '1')
    })

    it('Owner of blog can delete it', function() {
      cy.get('[data-testid="blog-delete-button"]').click()
      cy.get('[data-testid="blog-title"]').should('not.exist')
      cy.get('[data-testid="blog-author"]').should('not.exist')
    })

    it.only('blogs are ordered according to likes', function() {
      cy.createBlog({
        title: 'second blog from cypress',
        author: 'johnny',
        url: 'http://localhost:3000'
      })

      cy.get('[data-testid="toggle-blog"]').eq(1).click()
      cy.get('[data-testid="blog-like-button').click()
      cy.visit('http://localhost:3000')
      cy.get('[data-testid="blog"]').eq(0).should('contain', 'second blog from cypress')
      cy.get('[data-testid="blog"]').eq(1).should('contain', 'blog from cypress')
    })
  })
})
