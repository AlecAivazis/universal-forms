import BaseField from './BaseField'
import maxLength from '../validators/maxLength'

/**
 * A field that uses and text inputs and provides a variety of possible
 * validations for the incoming string.
 */
class TextField extends BaseField {
    // return the validators for the field
    get validators() {
        // the list of validators to apply to the text field
        const validators = []
        // grab the used configuration parameters
        const {max_length} = this.configuration
        // if there is a max length specified in the configuration
        if (max_length) {
            // add the maxLength validator to the stack
            validators.push(maxLength(max_length))
        }
        // return the list of validators
        return validators
    }
}


// export a factory for the class
export default (...args) => new TextField(...args)

// end of file
