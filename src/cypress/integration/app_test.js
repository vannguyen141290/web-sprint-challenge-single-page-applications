describe('test app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/pizza')
    })

    const nameInput = () => cy.get('input[name=name]')
    const sizeInput = () => cy.get('select')
    const specialInput = () => cy.get('input[name=special]')
    const quantityInput = () => cy.get('input[name=quantity]')
    const pepperoniChk = () => cy.get('input[name=pepperoni]')
    const garlicChk = () => cy.get('input[name=garlic]')
    const baconChk = () => cy.get('input[name=bacon]')
    const submitBtn = () => cy.get('button')


    it('test demo', () => {
        expect(1 + 2).be.equal(3)
    })

    it('test if can add text', () => {
        nameInput().type('thi nguyen')
        nameInput().should('have.value', 'thi nguyen')
        specialInput().type('make me a good pizza')
        specialInput().should('have.value', 'make me a good pizza')
        quantityInput().type('5')
        quantityInput().should('have.value', '5')
    })

    it('test if can select multiple toppings', () => {
        pepperoniChk().check()
        garlicChk().check()
        baconChk().check()
        pepperoniChk().should('be.checked')
        garlicChk().should('be.checked')
        baconChk().should('be.checked')
    })

    it('test if the submit button can be submitted', () => {
        nameInput().type('thi nguyen')
        sizeInput().select('s')
        pepperoniChk().check()
        quantityInput().type('5')
        submitBtn().click()
        nameInput().should('have.value', '')
        sizeInput().should('have.value', '')
        pepperoniChk().should('not.be.checked')
        quantityInput().should('have.value', '')
        submitBtn().should('be.disabled')
    })

})