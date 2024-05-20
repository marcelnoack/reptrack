describe( 'template spec', () => {
    it( 'passes', () => {
        cy.visit( 'https://example.cypress.io' )
    } )
} )

// login flow
// 1) login
// 2) success? 2a) yes: login; 2b) no: show error message
// 3) user active? 3a) yes: login; 3b) show mail verification message

// email verify flow
// 1) click on email verify link
// 2) success? 2a) yes: show success message; 2b) no: show error message
