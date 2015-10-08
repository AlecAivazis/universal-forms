import {isLength} from 'validator'


// validate that the string is less than the given length
export default function(length) {

    return function(str) {
        // if the string is greater than the max length
        if (!isLength(str, 0, length)) {
            // throw an error
            throw new Error(`${str} is longer than ${length}`)
        // otherwise the string is less than the max length
        } else {
            // return that it is valid
            return true
        }
    }
}
