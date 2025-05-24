// components/templates/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import style from '../../styles/Login.module.css';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function LoginPage () {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Обробник змін полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаємо помилку поля при редагуванні
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Очищаємо загальну помилку API при будь-яких змінах
    if (apiError) {
      setApiError('');
    }
  };

  // Валідація форми
  const validateForm = () => {
    const newErrors = {};
    
    // Перевірка email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Перевірка пароля
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    // Валідуємо форму перед відправкою
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      // Зберігаємо email для можливого використання в профілі
      localStorage.setItem('userEmail', formData.email);
      
      const userData = await authService.login(formData.email, formData.password);
      console.log('Успішний вхід:', userData);
      
      // Перевіряємо авторизацію після входу
      if (authService.isAuthenticated()) {
        console.log('Перенаправлення на /account після успішного входу');
        navigate('/');
      } else {
        console.error('❌ Токен не збережено після входу');
        setApiError('Помилка авторизації: не вдалося зберегти дані сесії');
      }
    } catch (err) {
      console.error('Помилка входу:', err);
      setApiError(err.response?.data?.message || 'Невірний логін або пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={style.login_container}>
      <div className={style.upper_inner_container}>
        <h1>Sign In</h1>
        {apiError && <div className={style.errorMessage}>{apiError}</div>}
      </div>

      <div className={style.lower_inner_container}>
        <div className={`${style.left_container} ${style.glass_card}`}>
          <form onSubmit={handleSubmit}>
            <div className={style.input_container}>
              <label htmlFor="email">Email Address:</label>
              <Input 
                type="email" 
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={errors.email ? style.inputError : ''}
              />
              {errors.email && <span className={style.errorText}>{errors.email}</span>}
            </div>

            <div className={style.input_container}>
              <label htmlFor="password">Password:</label>
              <Input 
                type="password" 
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className={errors.password ? style.inputError : ''}
              />
              {errors.password && <span className={style.errorText}>{errors.password}</span>}
            </div>

            <div className={style.forgot_password}>
              <a href="/password-reset">Forgot Password?</a>
            </div>

            <div className={style.button_container}>
              <Button 
                children={loading ? 'Processing...' : 'Sign In'} 
                type="submit" 
                disabled={loading} 
              />
            </div>
          </form>
        </div>

        <div className={`${style.right_container} ${style.glass_card}`}>
          <div className={style.inner_container}>
            <h2>New Customer?</h2>
            <Button 
              children={"Register"}
              type="button" 
              onClick={() => navigate('/register')} 
            />
          </div>
        </div>
      </div>
    </main>
  );
};