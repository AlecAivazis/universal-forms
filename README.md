

# Universal Forms

Yet another package for reducing the inevitable code duplication when dealing with forms in a web application. This one comes with customizable components for a few different common frontends view libraries! Currently, only React is supported. But Angular is on its way.


# Defining the Form

Whether you're working on the client or the server, the form definition is at the center of your validation logic.  Forms are defined as classes, as shown in the example below.  This example shows the definition of a form that you might use to register a user:

```javascript
// forms/SignUpForm.js

import {Form, fields} from 'universal-forms'
const {TextField, EmailField} = fields

class SignUpForm extends Form {
    static fields = [
        TextField('username'),
        EmailField('email'),
        TextField('bio', {
            label: 'Describe yourself (optional)',
            // fields are required unless otherwise indicated
            required: false,
            widget: {
                type: 'textarea',
            },
        }),
    ]
}
```

The following code examples reference this form.


# Validation on the Server

Even though validation is managed on the client, you still have to validate incoming POSTs in order to prevent against various web vulnerabilities. Luckily, `universal-forms` simplifies this validation.

The example below shows how to implement server-side validation using express.  However, `universal-forms` **does NOT require that you use express**.

```javascript
// server.js

import express from 'express'
import bodyParser from 'body-parser'
import User from 'path/to/your/user/model'
// import the form class from the example above
import SignUpForm from 'forms/SignUpForm'


const app = express()
// a json body parser is needed so that the request body is an object
const jsonParser = bodyParser.json()

app.post('/signup', jsonParser, (req, res) => {
    // load the form with the data from the POST
    const form = new SignUpForm(req.body)
    // if the form is valid
    if (form.isValid) {
        // create a new user model
        const newUser = new User(form.values)
        // save it to the database
        newUser.save((error, user) => {
            if (error) {
                res.status(400).send(error.message)
            }
            res.send(`created user ${user.id}`)
        })
    // otherwise the form is not valid
    } else {
        // respond with an error detailing the problems with the given form data
        res.status(400).send(`invalid form: ${form.errors}`)
    }
})

/* ... additional logic for serving the frontend ... */  

```

# Validation on the Client

As of right now, `universal-forms` only has support for React as the view library, but angular support is on its way.

## React

Once you have defined a form class (as done above), displaying the form in the browser is only a few lines more:

```javascript
// components/forms/SignUpFormComponent.js

import React from 'react'
import {UniversalFormComponent} from 'universal-forms'
// import the form class from the example above
import SignUpForm from 'forms/SignUpForm'

class SignUpFormComponent extends React.Component {
    render() {
        return (
            <UniversalFormComponent
                form={SignUpForm}
                action='/login'
            />
        )
    }
}
```

This will result in a form whose submit button is a traditional `<input>` element and `POST`s to the action parameter when the fields are valid.

### Specifying a Custom Callback

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
            body: JSON.stringify(formData),
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

    render() {
        return (
            <UniversalFormComponent
                form={SignUpForm}
                onSubmit={this.submitForm}
            />
        )
    }
}
```

The submission callback recieves the value of the form fields as an object. Alternatively, the `UniversalFormComponent` has a `resultAsString` prop which stringifies the data for you reducing even more clutter.

Keep in mind that while this example uses `isomorphic-fetch` to handle the xhr request, you could use any similar package instead.

### Customizing the React component

Customizing the look and feel of the form, is as easy as passing in a few props to the `UniversalFormComponent`.  Here is the complete list of props accepted by the `UniversalFormComponent`, all of which are optional:

* `onSubmit`: Custom handler to fire when the submit button is clicked.  Will be passed the form data as a JSON object.
* `action`: The URI to POST to.
* `method`: Sets the method used when submitting the form. This prop is only used if `action` is set.
* `submitText`: Sets the text of the submit button.  Defaults to `"Submit"`.
* `style`: Styles the form element as a whole.
* `fieldStyle`: Styles each field element (an element that contains the label and the appropriate widget for each given field).
* `widgetStyle`: Styles each field widget. Additional styles can be passed as parameters when created.
* `labelStyle`: Styles each label element.
* `submitButtonStyle`: Styles the submit button.
* `submitContainerStyle`: Styles the container around the submit button. Useful for defining its own alignment.
