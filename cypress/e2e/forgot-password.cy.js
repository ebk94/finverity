describe('TC-01 forgot password', () => {
  it('should open base url', () => {
    cy.visit('/')
    cy.url().should('eq', 'https://staging.finverity.com/login');
  })

  it('should check Sign in form', () => {
    cy.get('.right-side')
      .should('be.visible')

    cy.get('#email_sign_in')
      .should('be.visible')

    cy.get('#password_sign_in')
      .should('be.visible')
  })

  it('should close the iframe', () => {
    cy.get('iframe[name="us-entrypoint-bubbleV2"]')
      .should('be.visible')
      .iframe()
      .find(".closeButton")
      .click()
  })

  it('should click and send', () => {
    cy.get('.forgot-pass__link')
      .should('be.visible')
      .click()

    cy.get('.reset-password').should('be.visible')
    cy.get('#reset-password-email')
      .clear()
      .type('batyrsocial@gmail.com')
      .should('have.value', 'batyrsocial@gmail.com')

    cy.intercept('/auth/restore-password*').as('getRestorePass')
    
    cy.get('.button')
      .should('not.be.disabled')
      .click()

    cy.wait('@getRestorePass').its('response.statusCode').should('eq', 200)
  })

  it('should show the message and send link', () =>{
    cy.get('p')
      .should('have.text', 'Please check your email inbox and click url to reset your password')
    
    cy.get('.button')
      .should('be.visible')
      .click()
  })
})