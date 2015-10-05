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
