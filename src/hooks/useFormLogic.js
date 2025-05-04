import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useFormLogic = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const validations = {
      name: {
        pattern: isRTL ? /^[\u0600-\u06FF\s]+$/ : /^[a-zA-Z\s]+$/,
        message: isRTL ? 'الرجاء إدخال اسم صحيح' : 'Please enter a valid name'
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: isRTL ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email'
      },
      phone: {
        pattern: /^\+?[0-9]{8,}$/,
        message: isRTL ? 'الرجاء إدخال رقم هاتف صحيح' : 'Please enter a valid phone number'
      }
    };

    Object.keys(validations).forEach(field => {
      if (!formData[field].match(validations[field].pattern)) {
        newErrors[field] = validations[field].message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling
      setFormStatus("success");
      setFormData({
        name: '', email: '', phone: '', subject: '', message: ''
      });
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    formStatus,
    handleChange,
    handleSubmit
  };
};
