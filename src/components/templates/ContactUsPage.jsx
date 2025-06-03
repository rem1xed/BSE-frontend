import React, { useState } from 'react';
import classes from '../../styles/ContactUsPage.module.css';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useNavigate } from 'react-router-dom';
import { sendFormData } from '../../api/contactForm';
import AdBanner from '../../media/Ad_Banner.png';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    problem: '',
    date: ''
  });
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full Name must be at least 2 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      };
      const isSent = await sendFormData(updatedFormData);
      navigate('/contact-us/');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Помилка відправки форми');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.main_cont}>
      {/* Лівий банер */}
      <div className={classes.left_banner}>
        <img 
          src={AdBanner} 
          alt="Advertisement" 
          className={classes.banner_image} 
          onClick={() => window.open('https://example.com', '_blank')}
        />
      </div>

      {/* Основний контент */}
      <div className={classes.up_info}>
        <h1>Contact Us</h1>
        <div className={classes.formContainer}>
          {apiError && <div className={classes.error_message}>{apiError}</div>}
          <form className={classes.contactForm} onSubmit={handleSubmit}>
            <Input 
              type="text" 
              name="fullName" 
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Your full name'
              error={errors.fullName}
            />
            
            <Input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder='Your email'
              error={errors.email}
            />

            <Input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder='Your phone number'
              error={errors.phone}
            />

            <textarea 
              name="problem" 
              className={classes.formTextarea} 
              value={formData.problem}
              onChange={handleChange}
              placeholder='Describe your problem...'
            ></textarea>

            <Button 
              type="submit"
              disabled={loading}
              id={classes.formButton}
            >
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </div>
      </div>

      {/* Правий банер */}
      <div className={classes.right_banner}>
        <img 
          src={AdBanner} 
          alt="Advertisement" 
          className={classes.banner_image} 
          onClick={() => window.open('https://example.com', '_blank')}
        />
      </div>
    </div>
  );
}

export default ContactUsPage;