import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/RegistrationPage.module.css";
import Input from "../atoms/Input";
import api from "../../api/axios";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Обробник змін полів форми
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Очищаємо помилку поля, коли користувач почав редагувати
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
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
        
        // Перевірка паролю
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        // Видаляємо перевірку підтвердження паролю, бо це буде на бекенді
        // Але все одно перевіряємо, чи поле заповнене
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        }
        
        // Перевірка імені
        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        }
        
        // Перевірка прізвища
        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        }
        
        // Перевірка телефону
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s()-]/g, ''))) {
            newErrors.phone = "Phone number is invalid";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);
        
        // Валідуємо форму перед відправкою
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        
        try {
            // Структура даних, яку очікує сервер
            const userData = {
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                phone: formData.phone, // Змінюємо на 'phone' замість 'phoneNumber'
                firstName: formData.firstName,
                lastName: formData.lastName
            };
            
            console.log('Sending data:', userData); // Додаємо для дебагу
            
            // Явно вказуємо заголовки для цього запиту
            const response = await api.post('/auth/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Response:', response.data); // Додаємо для дебагу
            
            // Перенаправляємо на сторінку логіну після успішної реєстрації
            navigate('/login', { 
                state: { 
                    message: 'Registration successful! Please log in to continue.' 
                }
            });
        } catch (err) {
            console.error("Registration error:", err.response?.data || err);
            
            if (err.response?.data?.message) {
                // Обробляємо різні типи помилок від бекенду
                if (typeof err.response.data.message === 'string') {
                    setApiError(err.response.data.message);
                } else if (Array.isArray(err.response.data.message)) {
                    // Якщо прийшов масив помилок, показуємо першу
                    setApiError(err.response.data.message[0]);
                } else {
                    setApiError('Registration failed. Please try again.');
                }
                
                // Якщо бекенд повернув помилку про невідповідність паролів,
                // встановлюємо цю помилку для поля confirmPassword
                if (err.response.data.message.includes('Passwords do not match')) {
                    setErrors(prev => ({
                        ...prev,
                        confirmPassword: 'Passwords do not match'
                    }));
                }
            } else {
                setApiError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.upper_inner_container}>
                <h1>Register</h1>
                {apiError && <div className={styles.errorMessage}>{apiError}</div>}
            </div>

            <div className={styles.lower_inner_container}>
                <div className={styles.left_container}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.input_container}>
                            <label htmlFor="email">Email Address:</label>
                            <Input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={errors.email ? styles.inputError : ''}
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>

                        <div className={styles.input_container}>
                            <label htmlFor="firstName">First name:</label>
                            <Input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className={errors.firstName ? styles.inputError : ''}
                            />
                            {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                        </div>

                        <div className={styles.input_container}>
                            <label htmlFor="lastName">Last name:</label>
                            <Input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className={errors.lastName ? styles.inputError : ''}
                            />
                            {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                        </div>

                        <div className={styles.input_container}>
                            <label htmlFor="password">Password:</label>
                            <Input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={errors.password ? styles.inputError : ''}
                            />
                            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                        </div>
                        
                        <div className={styles.input_container}>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <Input 
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className={errors.confirmPassword ? styles.inputError : ''}
                            />
                            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                        </div>

                        <div className={styles.input_container}>
                            <label htmlFor="phone">Phone number:</label>
                            <Input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className={errors.phone ? styles.inputError : ''}
                            />
                            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                        </div>

                        <div className={styles.button_container}>
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className={styles.registrationButton}
                            >
                                {loading ? 'Processing...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className={styles.right_container}>
                    <div className={styles.inner_container}>
                        <h2>Have an account?</h2>
                        <button 
                            type="button" 
                            onClick={() => navigate('/login')} 
                            className={styles.registrationButton}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}