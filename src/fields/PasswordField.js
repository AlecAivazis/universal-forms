// local imports
import BaseField from './BaseField'

/**
 * A field that acts like a text field but hides the value when typing.
 */
class PasswordField extends BaseField {
    widget = {
        type: 'password',
    }
}


// export a factory for the class
export default (...args) => new PasswordField(...args)

// end of file
