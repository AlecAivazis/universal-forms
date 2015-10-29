// import the tested validators
import {isEmail, maxLength, minLength} from '../src/validators'

// a generic test for a validator
const testValidator = (name, validate, validString, invalidString) => {
    describe(name, function() {

        it('throws a ValidationError when invalid', function(){
            // make sure the validator throws the correct error type
            expect(() => validate(invalidString)).to.throw(Error)
        })

        it('succeeds when valid', function() {
            // validate the appropriate string
            const isValid = validate(validString)
            // check that it validated
            expect(isValid).to.be.true

        })
    })
}

// test the validators
testValidator('isEmail', isEmail, 'a@a.com', 'a@a')
testValidator('maxLength', maxLength(2), 'a', 'bbb')
testValidator('minLength', minLength(2), 'aa', 'b')


// end of file
