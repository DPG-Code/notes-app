Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
        username,
        password
      }).then(response => {
        localStorage.setItem('loggedNotAppUser', JSON.stringify(response.body))
      })
      cy.visit('http://127.0.0.1:5173/')
})

Cypress.Commands.add('createNote', ({content, important}) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/notes",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNotAppUser')).token}`
    }
  })

  cy.visit('http://127.0.0.1:5173/')
})