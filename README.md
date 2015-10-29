

# Universal Forms

Yet another package for reducing the inevitable code duplication when dealing with forms in a web application. This one comes with customizable components for a few different common frontends view libraries! Currently, only React is supported. But Angular is on its way.


# Defining the Form

Regardless of wether you're dealing with the front or back, the form object is at the center of your validation logic. Defining one is easy. For example, here is a form you might use to register a user:

```javascript
// forms/SignUpForm.js

// import used models from universal-forms
import {Form, fields} from 'universal-forms'
const {TextField, EmailField} = fields

// the form to handle user signups
class SignupForm extends Form {
    static fields = [
        TextField('name'),
        EmailField('email'),
        TextField('link'),
        TextField('message', {
            label: 'message (optional)',
            required: false,
            widget: {
                type: 'textarea',
            },
        }),
    ]
}
```

The following code examples reference this form.

# Validating on the client

Displaying the form in the browser is only a few lines of javascript after you import the form you just created:

```javascript
// components/forms/SignUpFormComponent.js

// third party imports
import React from 'react'
import {UniversalFormComponent} from 'universal-forms'
// local imports
import LoginForm from 'forms/SignUpForm'


class SignUpFormComponent extends React.Component {
    // render the component
    render() {
        // render the new component
        return <UniversalFormComponent 
                  form={SignUpForm} 
                  action='/login'
                  {...this.props} />
    }
}
```

This will result in a form whose submit button is a traditional `<input>` element and `POST`s to the action parameter when the fields are valid. 

If you would rather perform the submission yourself over an ajax request, you can simply pass a callback to the `onSubmit` prop:

```javascript
// components/forms/SignUpFormComponent.js

// third party imports
import React from 'react'
import {UniversalFormComponent} from 'universal-forms'
import fetch from 'isomorphic-fetch'
// local imports
import LoginForm from 'forms/SignUpForm'


class SignUpFormComponent extends React.Component {

  // data gets passed to the submission handler as an object
  submitForm(formData) {
    fetch('/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData), // 
    })
    // if the request was made
    .then((response) => {
      // parse the response as text
      return response.text()
    })
    // use the response
    .then((responseText) => {
      console.log(responseText)
    })
    
  }

  // render the component
  render() {
    // render the new component
    return <UniversalFormComponent 
              form={SignUpForm} 
              action='/login'
              {...this.props} />
  }
}
```

The submission callback recieves the value of the form fields as an object. Alternatively, the `UniversalFormComponent` has a `resultAsString` prop which stringifies the data for you reducing even more clutter.

Keep in mind that while this example uses `isomorphic-fetch` to handle the xhr request, you could use any similar package instead.

## Customizing the React component

In order to customize the look and feel of the form, the `UniversalFormComponent` has the following properties which style the specified form elements:


# Serverside validation
