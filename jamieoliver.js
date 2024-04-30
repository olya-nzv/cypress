describe('smoke test', function () {
    beforeEach(() => {
        Cypress.Cookies.defaults({
          preserve: () => true
        })
    });
    it('log in(positive case: valid password and email)', function () {
        cy.visit('https://www.jamieoliver.com/');
        cy.get('#ccc-recommended-settings > span').click();
        cy.get('.launch-login').click();
        cy.get('#login-txt-email').type('olga.nzv@gmail.com');
        cy.get('#login-txt-password').type('591041418cy');
        cy.get('.gtm_login_signin').click();
        cy.wait(10000);
        cy.get('.avatar').should('be.visible');
    })
    it('hover', function () {
        cy.get('#gtm_nav_discover').trigger('mouseover')
        cy.get("#dropdown > div.container.submenu.submenu-discover").should('be.visible');
    })
    it('view more', function () {
        cy.get("#menu-item-138343").click();
        cy.url().should('include', '/features/');
    })
    it('search', function () {
        cy.get('.site-search > span > svg').click();
        cy.get('.tt-input').type('sunshine{enter}');
        cy.contains('Sunshine egg salad');
    })
    it('add recipe', function () {
        cy.get('a > h2').click();
        cy.get('.save').click();
        cy.get('rect.shape').should('be.visible'); 
    })
    it('saved recipe', function () {
        cy.get('rect.shape').click(); 
        cy.contains('Sunshine egg salad');
    })
    it('remove recipe', function () {
        cy.get(':nth-child(1) > .recipe-block > .recipe-meta > .binder-component > .save > svg > path').click(); 
        cy.get('[style="opacity: 1;"]',{ timeout: 10000 }).should('not.be', 'visible');  
    })
    it('go to twitter', function () {
        cy.get('#gtm_nav_twitter').should('have.attr', 'target', '_blank').click(); 
    })
    it('log out', function () {
        cy.wait(5000);
        cy.on('window:confirm', () => true);
    cy.window().then(win => {
        win.close();
    });
        cy.get('.avatar').trigger('mouseover')
        cy.get("#site-nav > div.nav-2 > ul > li.login-container > ul > li:nth-child(4) > a").click();
        cy.contains('Log In');
    })
  
    it('forgot password: negative', function () {
        cy.get('.launch-forgotten-password').click();
        cy.get('#forgotten-txt-email').type('olga.nzv');
        cy.get('.gtm_forgotten_password_submit').click();
        cy.contains('PLEASE ENTER A VALID EMAIL ADDRESS');
    })
    it('forgot password: positive', function () {
        cy.get('#forgotten-txt-email').clear();
        cy.get('#forgotten-txt-email').type('olga.nzv@gmail.com');
        cy.get('.gtm_forgotten_password_submit').click();
        cy.get('#forgotten-password-success > form > .active').should('be.visible'); 

})
})

