// components/templates/LoginPage.jsx
import '../../styles/Login.css';
import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Перевіряємо авторизацію при завантаженні сторінки
  useEffect(() => {
    if (authService.isAuthenticated()) {
      console.log('Користувач уже авторизований, перенаправлення на /account');
      navigate('/account');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Зберігаємо email для можливого використання в профілі
      localStorage.setItem('userEmail', email);
      
      const userData = await authService.login(email, password);
      console.log('Успішний вхід:', userData);
      
      // Перевіряємо авторизацію після входу
      if (authService.isAuthenticated()) {
        console.log('Перенаправлення на /account після успішного входу');
        navigate('/account');
      } else {
        console.error('❌ Токен не збережено після входу');
        setError('Помилка авторизації: не вдалося зберегти дані сесії');
      }
    } catch (err) {
      console.error('Помилка входу:', err);
      setError('Невірний логін або пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="navigation">
        <h1>Home</h1>
        <h1>&rarr;</h1>
        <h1>Login</h1>
      </div>
      <div className="divForNewCust">
        <h1>New Customer?</h1>
        <p>Sign in</p>
      </div>
      <div className="registration">
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="alighElRegist">
            <h1 className="h1InReg">Email address</h1>
            <p className="zirochkaRed">*</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <h1 className="h1InReg">Password</h1>
            <p className="zirochkaRed">*</p>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              <button 
                type="submit" 
                className="leftSideInLoginEl" 
                disabled={loading}
              >
                {loading ? 'Вхід...' : 'Button'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;