import validator from 'validator'
import curryRight from 'lodash/function/curryRight'
import keys from 'lodash/object/keys'
import Immutable from 'immutable'

// wrappers around the validator functions to be configured first and then called later
const isEmail = curryRight(validator.isEmail)
const maxLength = (length) => (str) => validator.isLength(str, 0, length)


export class Form {

    constructor(values) {
        // bind various functions
        this.validate = this.validate.bind(this)
        this.updateFields = this.updateFields.bind(this)
        // assign the initial values to the form if they were given
        this.values = values
    }


    get invalid_fields() {
        // if there the form is not bound
        if (!this.is_bound){
            throw 'Form error: asking for invalid fields of an unbound form.'
        }

        // grab the valid fields
        return this.fields.filter((field) => field.is_valid)
    }


    get fields() {
        return this.constructor.fields
    }


    get is_bound() {
        return this.values === {}
    }


    get is_valid() {
        // the form is valid of there are no invalid fields
        return this.invalid_fields.length === 0
    }


    set values(values) {
        // if a truthy parameter was passed
        if (values) {
            // update the fields of the form using immutable values
            this.updateFields(Immutable.Map(values))
            // validate the form
            this.validate()
        }
    }


    validate() {
        // for each field in the form
        for (const field of this.fields) {
            // validate the field
            field.validate()
        }
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
