import validator from 'validator'
import curryRight from 'lodash/function/curryRight'

// wrappers around the validator functions to be configured first and then called later
const isEmail = curryRight(validator.isEmail)
const maxLength = (length) => (str) => validator.isLength(str, 0, length)


export class Form {

    constructor(values) {
        // assign the initial values if they were given
        this.values = values
        // bind various functions
        this.get_fields = this.get_fields.bind(this)
        this.is_valid = this.is_valid.bind(this)
    }


    get_fields() {
        return this.constructor.fields
    }


    is_valid() {
        return true
    }

    set_values(values) {
        this.values = {...this.values, ...values}
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
