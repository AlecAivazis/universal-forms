/**
 * The base field from which all other fields inherit.
 */
// class BaseField {

// }

// export the class
// export default BaseField

export default function BaseField(name, {label, widget = defaultWidget} = {}, ...args) {
    // use the name for the label if its not present
    const fieldLabel = label ? label : name
    // return the data structure for the base field
    return {
        name,
        label: fieldLabel,
        widget,
    }
}


// the default widget to use for a field
const defaultWidget = {
    type: 'input'
}

// end of file
