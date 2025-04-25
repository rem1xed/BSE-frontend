import React from 'react'
import style from '../../styles/ForgotPassword.module.css' // Підключаємо окремий CSS файл

const ForgotPassword = () => {
  return (
    <div className={style.App}>
      {/* Навігаційна панель */}
      <div className={style.navigation}>
        <h1>Home</h1>
        <h1>·</h1>
        <h1>Forgot password</h1>
      </div>

      {/* Основний контент */}
      <div className={style.containerForForgetPassP1}>
        <div className={style.forgotPasswordContent}>
          <h1 className={style.forgotPasswordh1}>Forgot password</h1>
          <p>Please enter your email to reset the password</p>

          <form className={style.forgotPasswordForm}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              className={style.input}
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
