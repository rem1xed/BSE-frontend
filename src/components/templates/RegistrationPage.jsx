import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "../../styles/RegistrationPage.module.css";
import Input from "../atoms/Input";
import api from "../../services/api";

export default function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <div className={styles.upper_inner_container}>
            <h1>Register</h1>
            {error && <div className="error-message">{error}</div>}
        </div>

        <div className={styles.lower_inner_container}>

            <div className={styles.left_container}>     {/*ADD FORM TAG*/}
                <form method='POST'>
                    <div className={styles.input_container}>
                        <label htmlFor="user_email">Email Address:</label>
                        <Input 
                            type="email" 
                            name="user_email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="user_first_name">First name:</label>
                        <Input 
                            type="text" 
                            name="user_first_name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="user_last_name">Last name:</label>
                        <Input 
                            type="text" 
                            name="user_last_name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="user_pass">Password:</label>
                        <Input 
                            type="password" 
                            name="user_pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.input_container}>
                        <label htmlFor="user_tel">Phone number:</label>
                        <Input 
                            type="tel" 
                            name="user_tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.button_container}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                </form>
            </div>

          <div className={styles.right_container}>
            <div className={styles.inner_container}>
                <h2>Have an account?</h2>
                <button type="button" onClick={() => navigate('/login')}>
                    Sign In
                </button>
            </div>
          </div>
        </div>
    </div>
  );
}