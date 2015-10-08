// thirdparty imports
import Immutable from 'immutable'
import flatten from 'lodash/array/flattenDeep'
// make sure the babel polyfill is loaded
import 'babel/polyfill'

/**
 * This class provides basic form functionalities including validation
 * and sanitization.
 */
export class Form {


    constructor(values) {
        // bind various functions
        this.updateFields = this.updateFields.bind(this)
        // start the form as unbound
        this.is_bound = false
        // assign the initial values to the form if they were given
        this.values = values
    }


    *[Symbol.iterator]() {
        // for each field in the form
        for (const field of this.fields) {
            // return the field
            yield field
        }
    }


    get invalid_fields() {
        // if there the form is not bound
        if (!this.is_bound) {
            throw new Error('Form error: asking for invalid fields of an unbound form.')
        }

        // grab the invalid fields
        return this.fields.filter((field) => !field.is_valid)
    }


    get fields() {
        return this.constructor.fields
    }


    get is_valid() {
        // if the form is not bound
        if (!this.is_bound) {
            return false
        }
        // the form is valid of there are no invalid fields
        return this.invalid_fields.length === 0
    }


    set values(values) {
        // if a truthy parameter was passed
        if (values) {
            // update the fields of the form using immutable values
            this.updateFields(Immutable.Map(values))
            // bind the form
            this.is_bound = true
        }
    }


    get values() {
        // the object to build that represnt that value of the form
        const value = {}
        // for every field in the form
        for (const field of this.fields) {
            // assign the field data to the value
            value[field.name] = field.value
        }
        // return the vaslue hash
        return value
    }


    get errors() {
        // flatten the list of errors
        return flatten(this.fields.map((field) => field.errors))
    }


    updateFields(values) {
        // for every field in the form
        for (const field of this.fields) {
            // set the internal value to the passed value
            field.value = values.get(field.name)
        }
    }
}


export function FormFactory(fields) {
    // the form class
    const form = Form
    // assign the fields to the form
    form.fields = fields
    // return the class
    return form
}


export default Form
