/**
 * The base field from which all other fields inherit.
 */
class BaseField {
     constructor(name, params, ...args) {
        this.configuration = {
            name: name,
            label: name,
            ...defaultConfig,
            ...params,
        }
    }

    get name() {
        return this.configuration.name
    }

    get label() {
        return this.configuration.label
    }

    get widget() {
        return this.configuration.widget
    }
}

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
