import React from 'react'
import style from '../../styles/ForgotPassword.module.css' // Підключаємо окремий CSS файл
import Input from '../atoms/Input'
import Button from '../atoms/Button'

const ForgotPassword = () => {
  return (
    <>
      {/* Основний контент */}
      <div className={style.password_reset_container}>
        
        <div className={`${style.forgotPasswordContent} ${style.glass_card}`}>
          <div className={style.upper_inner_container}>
            <h1>Forgot password?</h1>
            {/* {apiError && <div className={style.errorMessage}>{apiError}</div>} */}
          </div>
          <p>Please enter your email to reset the password</p>

          <div className={style.middle_container}>
            <form className={style.forgotPasswordForm}>
              <label htmlFor="email">Your Email</label>
              <div className={style.input_container}>
                <Input
                  type="email"
                  id="email"
                  className={style.input}
                  placeholder="Enter your email"
                  required
                  />
              </div>
              
              <div className={style.button_container}>
                <Button type="submit"
                  children={"Reset Password"}
                  />
              </div>

              <div className={style.forgot_password}>
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
