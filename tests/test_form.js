// thirdparty imports
import sinon from 'sinon'
// local imports
import Form from '../src/form'
import EmailField from '../src/fields/EmailField'
import TextField from '../src/fields/TextField'

export default class TestForm extends Form {
    static fields = [
        TextField('name'),
        EmailField('email'),
    ]
}

class OptionalFieldForm extends Form {
    static fields = [
        TextField('name'),
        EmailField('email', {required:false})
    ]
}

// test the form
describe('Form', function () {

    // a set of correct initial data
    const validData = {
        name: 'foo',
        email: 'a@a.com',
    }

    // a set of incorrect initial data
    const invalidData = {
        name: 1,
        email: 'foo'
    }


    it('is unbound when initialized without initial data', function () {
        // create a form without initial data
        const form = new TestForm()
        // make sure it is unbound
        expect(form.isBound).to.be.false
    })


    it('is bound when initialized with valid data', function () {
        // create a form with initial data
        const form = new TestForm(validData)
        // make sure its bound
        expect(form.isBound).to.be.true
    })


    it('is bound when initialized with invalid data', function(){
        // create the form with invalid initial data
        const form = new TestForm(invalidData)
        // make sure its bound
        expect(form.isBound).to.be.true
    })


    it('is invalid when there is no initial data', function() {
        // create a form with no data
        const form = new TestForm()
        // make sure its invalid
        expect(form.isValid).to.be.false
    })


    it('is valid with valid initial data', function() {
        // create a form with valid data
        const form = new TestForm(validData)
        // make sure its valid
        expect(form.isValid).to.be.true
    })


    it('is invalid with invalid initial data', function() {
        // create a form with invalid data
        const form = new TestForm(invalidData)
        // make sure its invalid
        expect(form.isValid).to.be.false
    })


    it('can return the list of errors for invalid data', function() {
        // create a form with invalid data
        const form = new TestForm(invalidData)
        // make sure the errors are a list
        // TODO: this could still be nested arrays
        expect(form.errors).to.be.an('array')
    })


    it.skip('can iterate can be iterated over', function() {
        // create a form with no data
        const form = new TestForm()
        // create a sinon spy to track the number of times called
        const numberSpy = sinon.spy()
        // for every field
        for (const field of form){
            // call the spy
            numberSpy()
        }
        // expect the spy to be called for each field
        expect(numberSpy.callCount).to.equal(form.fields.length)
    })


    it('can recieve and return the same value', function() {
        // the value to test
        const  value = validData
        // create a form with no data
        const form = new TestForm()
        // set value of the form
        form.values = value
        // make sure the values are retrievable
        expect(form.values).to.deep.equal(value)
    })

    it('can be valid with an invalid optional field', function() {
        // the form to test
        const form = new OptionalFieldForm({
            name: 'foo'
        })
        // make sure the form is still valid even though the optional field will be empty
        expect(form.isValid).to.be.true
    })
})
