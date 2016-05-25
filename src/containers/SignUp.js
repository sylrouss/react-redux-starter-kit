import React from 'react'
import { initialize } from 'redux-form'
import { connect } from 'react-redux'
import ContactForm from '../components/SignUpForm/SignUpForm'

class SignUp extends React.Component {

  handleSubmit (data) {
    window.alert('Data submitted! ' + JSON.stringify(data))
    this.props.dispatch(initialize('sign-up-form', {}))
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>
          Sign-up form
        </h1>
        <ContactForm onSubmit={this.handleSubmit.bind(this)}/>
      </div>)
  }
}
SignUp.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}

export default connect()(SignUp)
