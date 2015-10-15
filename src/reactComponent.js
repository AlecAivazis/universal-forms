// third party imports
import React from 'react'

class UniversalForm extends React.Component {


    static propTypes = {}


    static defaultProps = {}


    constructor(props, ...args) {
        // instantiate this
        super(props, ...args)
        // set the initial state
        this.state = {
            // create a new form object with the intial data set
            form: new props.form(props.initialData),
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


    getElementForWidget({type = 'input', ...unused_props}) {
        if (type === 'input') {
            return <input {...unused_props}/>
        } else if (type === 'textarea') {
            return <textarea {...unused_props}/>
        }
    }


    get formData() {
        // the object containing the form data
        const formData = {}
        // go over all of the fields in the form
        for (const {name} of this.state.form.fields) {
            // add the input value to the object
            formData[name] = this.refs[name].value
        }
        // return the data object
        return formData
    }

    get submitButton() {
        // grab the used props
        const {onSubmit} = this.props
        // if there is an onClick handler
        if (onSubmit) {
            return (
                <span style={styles.submit_button} onClick={this.onSubmit}>
                    send
                </span>
            )
        // otherwise use a native button
        }
        return (
            <input style={styles.submit_button} type='submit' value='send'/>
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
            ...unused_props,
            action,
        } = this.props

        // render the component
        return (
            <form {...unused_props} ref='form' action={action}>
                {this.state.form.fields.map(({name, label, widget}) => {
                    // the input widget
                    const input_widget = React.cloneElement(this.getElementForWidget(widget), {
                        id: name,
                        ref: name,
                        style: inputStyle,
                    })
                    // render the form line
                    return (
                        <div style={fieldStyle} key={name}>
                            <label htmlFor={name} style={labelStyle}>{label}:</label>
                            {input_widget}
                        </div>
                    )
                })}
                <div style={styles.submit_container}>
                    {this.submitButton}
                </div>
            </form>
        )
    }
}

const styles = {
    submit_container: {
        textAlign: 'right',
        marginTop: 30,
    },
    submit_button: {
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
