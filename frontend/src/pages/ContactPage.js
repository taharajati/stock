import React, { useState } from 'react';
import { FormInput, FormTextarea, FormButton, Alert } from '../components/common/FormComponents.jsx';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'نام الزامی است';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'موضوع الزامی است';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'پیام الزامی است';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // Here you would typically make an API call to send the message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setAlert({
        show: true,
        type: 'success',
        message: 'پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error sending message:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.'
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      title: 'آدرس',
      content: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: 'تلفن',
      content: '۰۲۱-۱۲۳۴۵۶۷۸',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: 'ایمیل',
      content: 'info@tahlilbors.com',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-16 rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">تماس با ما</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            برای ارتباط با ما می‌توانید از طریق فرم زیر پیام خود را ارسال کنید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gold">
            <h2 className="text-2xl font-bold text-navy mb-6">ارسال پیام</h2>
            
            <Alert
              type={alert.type}
              message={alert.message}
              show={alert.show}
              onClose={() => setAlert({ ...alert, show: false })}
            />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="نام و نام خانوادگی"
                name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                error={errors.name}
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                required
                loading={loading}
              />
              
              <FormInput
                label="ایمیل"
                name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                error={errors.email}
                placeholder="example@email.com"
                required
                loading={loading}
              />
              
              <FormInput
                label="موضوع"
                name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                error={errors.subject}
                placeholder="موضوع پیام خود را وارد کنید"
                required
                loading={loading}
              />
              
              <FormTextarea
                label="پیام"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                error={errors.message}
                placeholder="پیام خود را اینجا بنویسید..."
                rows={4}
                required
              />
              
              <FormButton
                type="submit"
                loading={loading}
                disabled={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                ارسال پیام
              </FormButton>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-gold">
              <h2 className="text-2xl font-bold text-navy mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center ml-4">
                      {React.cloneElement(info.icon, { className: 'h-6 w-6 text-gold' })}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy mb-1">{info.title}</h3>
                      <p className="text-gray-700">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.1234567890123!2d51.3890!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzIxLjEiTiA1McKwMjMnMjAuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">شبکه‌های اجتماعی</h2>
              
              <div className="flex justify-center items-center gap-x-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-white border-2 border-gold-dark text-gold-dark rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/50"
                  aria-label="LinkedIn"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white border-2 border-gold-dark text-gold-dark rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/50"
                  aria-label="Twitter"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-white border-2 border-gold-dark text-gold-dark rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/50"
                  aria-label="Instagram"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center my-12">
          <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 