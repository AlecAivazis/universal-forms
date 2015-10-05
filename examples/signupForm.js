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
 * This prevents possible fuck ups with mispelling or not assigning `fields`
 * but is not as explicit/transparent.
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
