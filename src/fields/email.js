// local imports
import BaseField from './base'
import isEmail from '../validators/isEmail'

/**
 * A field that uses a text input and validates the incoming string as an e-mail.
 */
// class EmailField extends BaseField {

// }


export default function EmailField(name, params, ...args) {
    const field_params = {
        ...params,
        validators: [
            isEmail,
        ]
    }
    return BaseField(name, field_params, ...args)
}

// export default TextField

// end of file
