import BaseField from './base'
import maxLength from '../validators/maxLength'


/**
 * A field that uses and text inputs and provides a variety of possible
 * validations for the incoming string.
 */
// class TextField extends BaseField {

// }

// export default TextField




export default function TextField(name, params = {}, ...args) {
    // the validators for text fields
    const validators = []
    // if they asked for a max length
    if (params.maxLength) {
        validators.push(maxLength(params.maxLength))
    }
    // the text field specific parameters
    const field_params = {
        ...params,
        validators,
    }
    // if they asked for a maximum
    return BaseField(name, params, ...args)
}

// end of file
