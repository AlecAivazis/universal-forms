import {isEmail} from 'validator'


// the validator needs to check if the string is an email
export default function(str) {
    // if the string is not an email
    if (!isEmail(str)) {
        // throw an error
        throw new Error(`${str} is not an email`)
    // otherwise the string is an email
    } else {
        // return that it is valid
        return true
    }
}
