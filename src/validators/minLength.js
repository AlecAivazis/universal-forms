import {isLength} from 'validator'


// validate that the string is longer than the given length
export default function(length) {

    return function(str) {
        // if the string not greater than length
        if (!isLength(str, length, Infinity)){
            // throw an error
            throw new Error(`${str} is shorter than ${length}`)
        // otherwise the string is greater than the minimum length
        } else {
            // return that it is valid
            return true
        }
    }
}