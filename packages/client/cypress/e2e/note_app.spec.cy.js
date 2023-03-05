describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: "DPG-Code-test",
      name: "Daniel",
      password: "123456"
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('[name=username]').type('DPG-Code-test')
    cy.get('[name=password]').type('123456')
    cy.get('#form-login-button').click()
    cy.contains('New Note')
  })

  it('login fails whit wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[name=username]').type('DPG-Code-test')
    cy.get('[name=password]').type('incorret-pasword')
    cy.get('#form-login-button').click()
    cy.get('.error').should('contain', 'Wrong credentials')
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'DPG-Code-test', password: '123456' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New Note').click()
      cy.get('[name=content-note]').type(noteContent)
      cy.get('#form-note-button').click()
      cy.contains(noteContent)
    })

    describe('And a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: "First Note", important: false })
        cy.createNote({ content: "Second Note", important: false })
        cy.createNote({ content: "Third Note", important: false })
      })

      it('it can be made important', () => {
        cy.contains('Second Note').as('theNote')

        cy.get('@theNote')
          .contains('make important')
          .click()

        // cy.debug() => debugger!!!

        cy.get('@theNote')
          .contains('make not important')
      })
    })
  })
})