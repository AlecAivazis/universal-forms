// import the BaseField
import BaseField from '../src/fields/BaseField'

describe('BaseFields', function() {

    let baseField

    beforeEach(function() {
        baseField = new BaseField('hello')
    })


    it('has a name', function() {
        expect(baseField.name).to.be.a('string')
    })


    it('uses the label as a name if not defined', function() {
        expect(baseField.label).to.be.a('string')
    })


    it('has a widget', function() {
        expect(baseField.widget).to.be.a('object')
    })


    it('accepts and retains its value', function() {
        // the value to test
        const testValue = 'foo'
        // set the value
        baseField.value = testValue
        // make sure that it is the same as what we set
        expect(baseField.value).to.equal(testValue)
    })


    it('accepts arbitrary configuration params', function() {
        // the paramter to check in both configurations
        const testParam = 'foo'
        // the configuration to test
        const testConfig = {
            [testParam]: 'bar'
        }
        // create the field with the test configuration
        const testField = new BaseField('hello', testConfig)
        // make sure the configuration parameter gets assign correctly
        expect(testField.configuration[testParam]).to.equal(testConfig[testParam])
    })


    it('uses the label configuration parameter if present', function() {
        // the label to set
        const testLabel = 'foo'
        // create a field with a label
        const testField = new BaseField('hello', {
            label: testLabel
        })
        // make sure the label was assigned
        expect(testField.label).to.equal(testLabel)
    })


    it('uses an initial value if passed as a config param', function() {
        // the value to set
        const testValue = 'foo'
        // create the field with the initial value param
        const testField = new BaseField('hello', {
            initialValue: testValue,
        })
        // check that the value was used
        expect(testField.value).to.equal(testValue)
    })
})
