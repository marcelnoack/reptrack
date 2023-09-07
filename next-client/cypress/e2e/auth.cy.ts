describe( 'Sign In', () => {

    beforeEach( () => {
        cy.visit( '/signin' );
    } );

    it( 'should not sign in with wrong credentials', () => {
        cy.intercept( 'POST', '/v1/auth/signin', {
            statusCode: 401,
            body: {
                message: 'User Credentials are not correct'
            }
        } ).as( 'signinRequest' );

        cy.get( '[data-cy=signin_email_input]' ).type( 'test@mail.com' );
        cy.get( '[data-cy=signin_password_input]' ).type( 'Mytestpasswd1234!' );
        cy.get( '[data-cy=signin_submit_btn]' ).as( 'submit_button' );
        cy.get( '@submit_button' ).click();

        cy.wait( '@signinRequest' ).then( interception => {
            cy.get( '@submit_button' ).should( 'be.disabled' );
            cy.get( '[data-cy=signin_error]' ).should( 'be.visible' );
            cy.get( '[data-cy=signin_error]' ).should( 'contain.text', 'User Credentials are not correct' );
        } );
    } );
} );