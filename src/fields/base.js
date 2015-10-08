/**
 * The base field from which all other fields inherit.
 */
class BaseField {
     constructor(name, {initialValue, ...params}, ...args) {
        // create the field configuration
        this.configuration = {
            name: name,
            // use the name as the label if one was not given
            label: name,
            // apply the default configuration
            ...defaultConfig,
            // apply the given parameters
            ...params,
        },
        // the field starts off an invalid
        this.is_valid = false
        // use the initial value from the params
        this.value = initialValue
        // bind various functions
        this.validate = this.validate.bind(this)
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
        return this.configuration.widget
    }

    get errors() {
        // create a list of error hashes out of the validators that do not pass
        return this.validators.map(function(validate){
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
        return _.value
    }

    // validate the value based on the fields validators
    validate() {
        // the field is valid if the number of errors is zero
        return this.errors.length === 0
    }
}


// the default field configuration
const defaultConfig = {
    widget: defaultWidget,
}


// the default widget to use for a field
const defaultWidget = {
    type: 'input',
}


// export a factory for the class
export default (...args) =>  new BaseField(...args)


// end of file
