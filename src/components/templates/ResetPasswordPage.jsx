import React from 'react'
import './ForgotPassword.css' // Підключаємо окремий CSS файл

const ForgotPassword = () => {
  return (
    <div className="App">
      {/* Навігаційна панель */}
      <div className="navigation">
        <h1>Home</h1>
        <h1>·</h1>
        <h1>Forgot password</h1>
      </div>

      {/* Основний контент */}
      <div className="containerForForgetPassP1">
        <div className="forgotPasswordContent">
          <h1 className="forgotPasswordh1">Forgot password</h1>
          <p>Please enter your email to reset the password</p>

          <form className="forgotPasswordForm">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="Enter your email"
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
