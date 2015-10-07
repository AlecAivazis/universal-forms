// import the test form
import Form from './TestForm'

// test the form
describe('Form', function () {

    // a set of correct initial data
    const valid_data = {
        name: 'foo',
        email: 'a@a.com',
    }

    // a set of incorrect initial data
    const invalid_data = {
        name: 1,
        email: 'foo'
    }

    it('is unbound when initialized without initial data', function () {
        // create a form without initial data
        const form = new Form()
        // make sure it is unbound
        expect(form.is_bound).to.be.false
    })

    it.skip('is bound when initialized with valid data', function () {
        // create a form with initial data
        const form = new Form(valid_data)
        // make sure its bound
        expect(form.is_bound).to.be.true
    })

    it.skip('is bound when initialized with invalid data', function(){
        // create the form with invalid initial data
        const form = new Form(invalid_data)
        // make sure its bound
        expect(form.is_bound).to.be.true
    })

    it.skip('is invalid when there is no initial data', function() {
        // create a form with no data
        const form = new Form()
        // make sure its invalid
        expect(form.is_valid).to.be.false
    })

    it.skip('is valid with valid initial data', function() {
        // create a form with valid data
        const form = new Form(valid_data)
        // make sure its valid
        expect(form.is_valid).to.be.true
    })

    it.skip('is invalid with invalid initial data', function() {
        // create a form with invalid data
        const form = new Form(invalid_data)
        // make sure its invalid
        expect(form.is_valid).to.be.false
    })

    it.skip('can return the list of errors for invalid data', function() {
        // create a form with invalid data
        const form = new Form(invalid_data)
        // make sure the errors are a list
        // TODO: this could still be nested arrays
        expect(form.errors).to.be.an('array')
    })
})