import React, { useState, useEffect } from 'react';
import styles from '../../styles/ForgotPassword.module.css';
import { authService } from '../../services/authService';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Add regexp email validation


  useEffect(() => {
    if (authService.isAuthenticated()) {
      console.log('Користувач уже авторизований, перенаправлення на /account');
      navigate('/account');
    }
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleNext = () => {
    setError('');
    if (step === 1 && !email) {
      setError('Please enter email');
      return;
    }
    if (step === 2 && !code) {
      setError('Please enter code');
      return;
    }
    if (step === 4 && newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (step === 1) {
      if (!email) {
        setError('Please enter email');
        return;
      }
      authService.requestPasswordReset(email)
        .then(() => {
          setStep(2);
          setTimer(30);
        })
        .catch(() => {
          setError('Failed to send reset code. Please try again.');
        });
      return;
    }
  
    if (step === 2) {
      if (!code) {
        setError('Please enter code');
        return;
      }
      authService.verifyResetCode(email, code)
        .then(res => {
          if (res.data.valid) {
            setStep(3);
          } else {
            setError('Invalid code');
          }
        })
        .catch(() => {
          setError('Verification failed. Try again.');
        });
      return;
    }
  
    if (step === 3) {
      setStep(4); // Просто перейти на встановлення пароля
      return;
    }
  
    if (step === 4) {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      authService.resetPassword(email, code, newPassword)
        .then(() => {
          setStep(5);
        })
        .catch(() => {
          setError('Password reset failed. Try again.');
        });
      return;
    }      
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleResendCode = () => {
    authService.requestPasswordReset(email)
      .then(() => {
        setTimer(30);
      })
      .catch(() => {
        setError('Failed to resend code.');
      });
  };
  

  return (
    <div className={styles.password_reset_container}>
      {/* Step 1: Email */}
      {step === 1 && (
        <div className={styles['step-content']}>
          <h1 className={styles.title}>Forgot password</h1>
          <p className={styles.subtext}>Please enter your email to reset password</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Your Email"
          />
          {error && <p className={styles['error-message']}>{error}</p>}
          <button onClick={handleNext} className={styles.button}>Continue</button>
        </div>
      )}

      {/* Step 2: Code */}
      {step === 2 && (
        <div className={styles['step-content']}>
          <h1 className={styles.title}>Check your email</h1>
          <p className={styles.subtext}>We sent a code to {email}</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.input}
            placeholder="Enter code"
            maxLength="6"
          />
          {error && <p className={styles['error-message']}>{error}</p>}
          <button onClick={handleNext} className={styles.button}>Verify Code</button>
          <p className={styles['resend-code']}>
            Didn't receive code?{' '}
            <button
              onClick={handleResendCode}
              disabled={timer > 0}
              className={styles['resend-button']}
            >
              Resend {timer > 0 ? `(${timer}s)` : ''}
            </button>
          </p>
          <button onClick={handleBack} className={`${styles.button} ${styles['back-button']}`}>
            Back
          </button>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className={styles['step-content']}>
          <h1 className={styles.title}>Password reset</h1>
          <p className={styles.subtext}>Your password has been successfully reset</p>
          <button onClick={handleNext} className={styles.button}>Set New Password</button>
          <button onClick={handleBack} className={`${styles.button} ${styles['back-button']}`}>
            Back
          </button>
        </div>
      )}
      {/* Step 4: New Password */}
      {step === 4 && (
        <div className={styles['step-content']}>
          <h1 className={styles.title}>Set new password</h1>
          <p className={styles.subtext}>Create a new password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
            placeholder="New Password"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            placeholder="Confirm Password"
          />
          {error && <p className={styles['error-message']}>{error}</p>}
          <button onClick={handleNext} className={styles.button}>Update Password</button>
          <button onClick={handleBack} className={`${styles.button} ${styles['back-button']}`}>
            Back
          </button>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <div className={`${styles['step-content']} ${styles['success-step']}`}>
          <h1 className={styles['success-title']}>Successful!</h1>
          <p className={styles.subtext}>Your password has been changed</p>
          <button onClick={() => navigate("/login")} className={styles.button}>Back to Login</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;