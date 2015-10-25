/**
 * The base field from which all other fields inherit.
 */
class BaseField {
    constructor(name, {initialValue, ...params} = {}) {
        // create the field configuration
        this.configuration = {
            name: name,
            // use the name as the label if one was not given
            label: name,
            // apply the default configuration
            ...defaultConfig,
            // apply the given parameters
            ...params,
        }
        // use the initial value from the params
        this.value = initialValue
        this.widget = null
    }


    get name() {
        // grab the name from the configuration object
        return this.configuration.name
    }


    get label() {
        // grab the label from the configuration object
        return this.configuration.label
    }


    get widget() {
        // grab the widget from the configuration object
        return this.configuration.widget || this._widget || defaultWidget
    }


    set widget(widget) {
        this._widget = widget

    }

    get required() {
        return this.configuration.required
    }


    get errors() {
        // if there is no value defined
        if (!this.value) {
            return ['Please provide a value for this field.']
        }

        // create a list of error hashes out of the validators that do not pass
        return this.validators.map((validate) => {
            // looking for validation errors
            try {
                // check the current value agains the validator
                validate(this.value)
            // if an error was thrown
            } catch (err) {
                // return the error message
                return err.message
            }
        // clear the undefined validators
        }).filter((validator) => validator)
    }


    set value(value) {
        this._value = value
    }


    get value() {
        return this._value
    }


    // validate the value based on the fields validators
    get is_valid() {
        // if there is no value there it's not valid
        if (!this.value) {
            return false
        }

        // otherwise the field is valid if the number of errors is zero
        return this.errors.length === 0
    }

}


// the default field configuration
const defaultConfig = {
    widget: defaultWidget,
    required: true,
}

const defaultWidget = {
    type: 'input',
}

export default BaseField


// end of file
