import Form from './form'
import {TextField, EmailField} from './fields'

export default class SignUpForm extends Form {
    static fields = [
        TextField('name'),
        EmailField('email', {
            label: 'e-mail'
        }),
        TextField('link'),
        TextField('message', {
            label: 'message (optional)',
            widget: {
                type: 'textarea',
            },
        }),
    ]
}

/*
 * Could also implement a factory which provides the following api.
 * This prevents possible mistakes with mispelling or not assigning `fields`
 * but is not as explicit/transparent. Also, classes provide an easy way to 
 * add custom validation logic, through {validate_foo} methods.
 *
 * export default Form([
 *    TextField('name'),
 *    EmailField('email', {label: 'e-mail'}),
 *    TextField('link'),
 *    TextField('message', {label: 'message (optional)'}),
 *])
 *
 */

// end of file
