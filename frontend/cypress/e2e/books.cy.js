describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List
    cy.visit('/').
    get('[data-cy="link-to-books"]').click();
    //create books
    cy.get('[href="/books/create"]')
        .click()
        .get('[data-cy=input-book-title]')
        .type('New Book from Cypress')
        .get('[data-cy=button-submit-book]')
        .click()
        .get('[data-cy=book-list]')
        .contains('New Book from Cypress');
    //Show book
    cy.get('[data-cy^=link-to-visit-book-]')
        .last()
        .click()
        .get('h1')
        .should('contain.text', 'New Book from Cypress')
        .get('[href="/books"]')
        .click();
    //Edit book
    cy.get('[data-cy^=link-to-edit-book-]')
        .last()
        .click()
        .get('[data-cy=input-book-title]')
        .clear()
        .type('Edited Book from Cypress')
        .get('[data-cy=button-submit-book]')
        .click()
        .get('[data-cy=book-list]')
        .contains('Edited Book from Cypress');
    //Delete book
    cy.get('[data-cy^=button-to-delete-book-]')
        .last()
        .click()
    cy.get('[data-cy^=link-to-visit-book-]')
        .last().should('not.contain.text', 'Edited Book from Cypress');
  })
})