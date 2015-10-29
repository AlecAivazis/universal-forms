// thirdpart imports
import sinon from 'sinon'
// import the base field
import BaseField from '../src/fields/BaseField'
// import a validator to use in a test
import isEmail from '../src/validators/isEmail'



class CustomField extends BaseField{
    validators = [
        isEmail
    ]
}

// test the functionalities from fields inheriting from the base
describe('CustomField', function() {

    let customField

    beforeEach(function(){
        customField = new CustomField('foo')
    })

    it('is valid with a valid value', function() {
        // the value to test
        const testValue = 'a@a.com'
        // set the value
        customField.value = testValue
        // make sure its invalid
        expect(customField.isValid).to.be.true
    })

    it('is invalid with an invalid value', function() {
        // the value to test
        const testValue = 'foo'
        // set the value
        customField.value = testValue
        // make sure its invalid
        expect(customField.isValid).to.be.false
    })

    it('calls all of its validators', function() {
        // create two spies for the validators
        const validator1 = sinon.spy()
        const validator2 = sinon.spy()
        // sanity
        expect(validator1.called).to.be.false
        expect(validator2.called).to.be.false
        // set the validators of the field to the list
        customField.validators = [validator1, validator2]
        // set a value so that it calls its validators
        customField.value = "foo"
        // figure out if the validator is valid
        const isValid = customField.isValid
        // make sure both of the validators were called
        expect(validator1.called).to.be.true
        expect(validator2.called).to.be.true
    })

})
