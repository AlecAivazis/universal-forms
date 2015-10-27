// third party imports
import React from 'react'

class UniversalForm extends React.Component {


    static propTypes = {}


    static defaultProps = {
        submitText: 'submit',
    }


    constructor(props, ...args) {
        // grab the used props
        const {initialData, form as universalForm, ...unusedProps} = props
        // instantiate this
        super(unusedProps, ...args)
        // create the form  out of the initial data
        const form = new universalForm(initialData)
        // set the initial state
        this.state = {
            // create a new form object with the intial data set
            form,
            data: form.values
        }
        // bind various functions
        this.focus = this.focus.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }


    // called when the component is first mounted
    componentDidMount() {}


    // called before the component is removed from the dom
    componentWillUnmount() {}


    // focus the first input
    focus() {
        console.log('you want to focus on the form')
    }


    clear() {
        // create a version of the form data with empty values
        const emptyForm = {}
        // for each field in the form
        for (const {name} of this.state.form.fields) {
            // set the field to an empty value
            emptyForm[name] = ''
        }
        // update the state variable to the empty form values
        this.setState({
            data: emptyForm,
        })
    }


    getElementForWidget({type = 'input', ...unused_props}) {
        if (type === 'input') {
            return <input {...unused_props}/>
        } else if (type === 'textarea') {
            return <textarea {...unused_props}/>
        }
    }


    get formData() {
        // return the data object
        return this.state.data
    }
    

    get submitButton() {
        // grab the used props
        const {onSubmit, submitButtonStyle, submitText, submitButton} = this.props
        // if a custom submit button was return
        if (submitButton) {
            // use it instead
            return submitButton
        }

        // if there is an onClick handler
        if (onSubmit) {
            return (
                <span style={{...styles.submitButton, ...submitButtonStyle}} onClick={this.submitForm}>
                    {submitText}
                </span>
            )
        // otherwise use a native button
        }
        return (
            <input style={{...styles.submitButton, ...submitButtonStyle}} type='submit' value={submitText}/>
        )
    }


    // submit the form using the provided handler
    submitForm() {
        // get the submit handler from the component props
        const {onSubmit} = this.props
        // the object with the form data
        const formData = JSON.stringify(this.formData)
        // call the handler with the serialized data
        onSubmit(formData)
    }


    // render the component
    render() {
        // grab the used properties
        const {
            labelStyle,
            inputStyle,
            fieldStyle,
            submitContainerStyle,
            ...unused_props,
            action,
        } = this.props

        // render the component
        return (
            <form {...unused_props} ref='form' action={action} method='post'>
                {this.state.form.fields.map(({name, label, widget}) => {
                    // the input widget
                    const input_widget = React.cloneElement(this.getElementForWidget(widget), {
                        id: name,
                        ref: `field-${name}`,
                        style: inputStyle,
                        value: this.state.data[name],
                        onChange: () => {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    [name]: this.refs[`field-${name}`].value
                                }
                            })
                        },
                    })
                    // render the form line
                    return (
                        <div style={fieldStyle} key={name}>
                            <label htmlFor={name} style={labelStyle}>{label}:</label>
                            {input_widget}
                        </div>
                    )
                })}
                <div style={{...styles.submitContainer, ...submitContainerStyle}}>
                    {this.submitButton}
                </div>
            </form>
        )
    }
}

const styles = {
    submitContainer: {
        textAlign: 'right',
        marginTop: 30,
    },
    submitButton: {
        backgroundColor: '#2F5EBC',
        padding: 20,
        width: 150,
        display: 'inline-block',
        textAlign: 'center',
        color: 'white',
        cursor: 'pointer',
        textTransform: 'capitalize',
        border: 'none',
    },
}

export default UniversalForm


// end of file
