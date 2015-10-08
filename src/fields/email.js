// local imports
import BaseField from './base'
import isEmail from '../validators/isEmail'

/**
 * A field that uses a text input and validates the incoming string as an e-mail.
 */
class EmailField extends BaseField {
    validators = [
        isEmail,
    ]
}


// export a factory for the class
export default (...args) =>  new EmailField(...args)

// end of file
