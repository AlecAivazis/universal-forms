// import the BaseField 
import BaseField from '../src/fields/base'

describe('BaseFields', function() {

    let base_field

    beforeEach(function() {
        base_field = new BaseField('hello')
    })



    it('has a name', function() {
        expect(base_field.name).to.be.a('string')
    })


    it('uses the label as a name if not defined', function() {
        expect(base_field.label).to.be.a('string')
    })


    it('has a widget', function() {
        expect(base_field.widget).to.be.a('object')
    })


    it('accepts and retains its value', function() {
        // the value to test
        const test_value = 'foo'
        // set the value
        base_field.value = test_value
        // make sure that it is the same as what we set
        expect(base_field.value).to.equal(test_value)
    })


    it('accepts arbitrary configuration params', function() {
        // the paramter to check in both configurations
        const test_param = 'foo'
        // the configuration to test
        const test_config = {
            [test_param]: 'bar'
        }
        // create the field with the test configuration
        const test_field = new BaseField('hello', test_config)
        // make sure the configuration parameter gets assign correctly
        expect(test_field.configuration[test_param]).to.equal(test_config[test_param])
    })


    it('uses the label configuration parameter if present', function() {
        // the label to set
        const test_label = 'foo'
        // create a field with a label
        const test_field = new BaseField('hello', {
            label: test_label
        })
        // make sure the label was assigned
        expect(test_field.label).to.equal(test_label)
    })


    it('uses an initial value if passed as a config param', function() {
        // the value to set
        const test_value = 'foo'
        // create the field with the initial value param
        const test_field = new BaseField('hello', {
            initialValue: test_value,
        })
        // check that the value was used
        expect(test_field.value).to.equal(test_value)
    })


})