import React, { useState } from 'react';
import classes from '../../styles/ContactUsPage.module.css';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useNavigate } from 'react-router-dom';
import { sendFormData } from '../../api/contactForm';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    problem: '',
    date: ''
  })
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  // Виправте валідацію - зараз вона завжди true
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length < 2) { // Додайте нормальну перевірку
      newErrors.fullName = "Full Name must be at least 2 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) { // Додайте нормальну перевірку
      newErrors.phone = "Phone number is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Виправте встановлення дати
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const newdate = new Date();
      const updatedFormData = { 
        ...formData, 
        date: newdate.toString() 
      }; // Виправте цей рядок
      const isSent = await sendFormData(updatedFormData);
      navigate('/contact-us/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Помилка відправки форми');
    } finally {
      setLoading(false);
    }
  };


    return (
        <main className={classes.main_cont}>
            <div className={classes.up_info}>
                <h1>Contact Us</h1>
                <div className={classes.formContainer}>
                  <form className={classes.contactForm} onSubmit={handleSubmit}>
                    <Input 
                    type="text" 
                    name="fullName" 
                    id="" 
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder='Your full name'/>

                    <Input 
                    type="email" 
                    name="email" 
                    id="" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Your email'/>

                    <Input 
                    type="phone" 
                    name="phone" 
                    id="" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Your phone number'/>

                    <textarea 
                    name="problem" 
                    className={classes.formTextarea} 
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder='Describe your problem...' ></textarea>

                    <Button 
                    type="submit"
                    children={'Send'}
                    id={classes.formButton}
                    />
                  </form>
                </div>
            </div>
        </main>
    );
}

export default ContactUsPage;
