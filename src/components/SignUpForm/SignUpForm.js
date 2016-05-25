import React from 'react'
import { reduxForm } from 'redux-form'
import validator from 'validator'

function validateSignUp (data) {
  const errors = {}
  if (!data.username) {
    errors.username = 'Required'
  }
  if (!data.email) {
    errors.email = 'Required'
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Please enter a valid email'
  }
  if (!data.company) {
    errors.company = 'Required'
  }
  return errors
}

class SignUpForm extends React.Component {

  render () {
    const { fields: {username, email, company}, handleSubmit } = this.props
    return (
      <form className='form-horizontal' onSubmit={handleSubmit}>
        <div className={'form-group' + (username.error && username.touched ? ' has-error' : '')}>
          <label className='col-sm-2 control-label'>Username</label>
          <div className={username.error && username.touched ? 'col-sm-4' : 'col-sm-6'}>
            <input className='form-control' type='text' {...username}/>
          </div>
          <div className='col-sm-2'>
            {username.error && username.touched && <div>{username.error}</div>}
          </div>
        </div>

        <div className={'form-group' + (email.error && email.touched ? ' has-error' : '')}>
          <label className='col-sm-2 control-label'>Email</label>
          <div className={email.error && email.touched ? 'col-sm-4' : 'col-sm-6'}>
            <input className='form-control' type='text' {...email}/>
          </div>
          <div className='col-sm-2'>
            {email.error && email.touched && <div>{email.error}</div>}
          </div>
        </div>

        <div className={'form-group' + (company.error && company.touched ? ' has-error' : '')}>
          <label className='col-sm-2 control-label'>Company</label>
          <div className={company.error && company.touched ? 'col-sm-4' : 'col-sm-6'}>
            <input className='form-control' type='text' {...company}/>
          </div>
          <div className='col-sm-2'>
            {company.error && company.touched && <div>{company.error}</div>}
          </div>
        </div>

        <div className='form-group'>
          <button className='btn btn-success'
                  disabled={username.error || email.error || company.error}
                  onClick={handleSubmit}>Sign-up</button>
        </div>
      </form>
    )
  }
}
SignUpForm.propTypes = {
  fields: React.PropTypes.array.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'sign-up-form',
  fields: ['username', 'email', 'company'],
  validate: validateSignUp,
})(SignUpForm)
