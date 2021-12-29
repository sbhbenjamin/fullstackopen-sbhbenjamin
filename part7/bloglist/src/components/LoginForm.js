import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit} className='box'>
      <h2 className='is-size-4'>Login</h2>
      <div className='field'>
        <label className="label">username</label>
        <div className="control">
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            className='input'
            onChange={handleUsernameChange}
          />
        </div>
      </div>
      <div className='field'>
        <label className="label">password</label>
        <div className="control">
          <input
            id='password'
            type="text"
            value={password}
            name="Password"
            className='input'
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <button className='button is-primary' id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
