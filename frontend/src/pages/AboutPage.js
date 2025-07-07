import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  const teamMembers = [
    {
      name: 'علی محمدی',
      role: 'مدیرعامل',
      bio: 'بیش از ۱۵ سال تجربه در بازار سرمایه و تحلیل‌های مالی',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:ali@example.com'
      }
    },
    {
      name: 'سارا احمدی',
      role: 'مدیر تحلیل',
      bio: 'تحلیلگر ارشد با تخصص در تحلیل بنیادی و تکنیکال',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:sara@example.com'
      }
    },
    {
      name: 'محمد رضایی',
      role: 'مدیر فنی',
      bio: 'متخصص در توسعه سیستم‌های مالی و پلتفرم‌های معاملاتی',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:mohammad@example.com'
      }
    }
  ];

  const stats = [
    { number: '۱۰,۰۰۰+', label: 'کاربر فعال' },
    { number: '۵۰+', label: 'تحلیلگر متخصص' },
    { number: '۹۵%', label: 'رضایت کاربران' },
    { number: '۲۴/۷', label: 'پشتیبانی' }
  ];

  return (
    <div className="py-16 rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">درباره ما</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ما در تحلیل بورس، با هدف ارائه بهترین خدمات تحلیلی و آموزشی در حوزه بازار سرمایه فعالیت می‌کنیم
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16 border-l-4 border-gold">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">ماموریت ما</h2>
              <p className="text-gray-700 mb-6">
                ما معتقدیم که هر سرمایه‌گذار باید به ابزارها و دانش لازم برای تصمیم‌گیری هوشمندانه دسترسی داشته باشد. 
                به همین دلیل، ما پلتفرمی ایجاد کرده‌ایم که تحلیل‌های دقیق، آموزش‌های کاربردی و ابزارهای پیشرفته را در اختیار شما قرار می‌دهد.
              </p>
              <p className="text-gray-700">
                تیم ما متشکل از تحلیلگران حرفه‌ای و متخصصان بازار سرمایه است که با تجربه‌های ارزشمند خود، 
                راهنمای شما در مسیر سرمایه‌گذاری موفق خواهند بود.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center border-2 border-gold">
              <div className="text-3xl font-bold text-gold mb-2">{stat.number}</div>
              <div className="text-navy">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">تیم ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gold">
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                  <p className="text-gold mb-4">{member.role}</p>
                  <p className="text-gray-700 mb-6">{member.bio}</p>
                  <div className="flex justify-center items-center gap-x-6 mt-6">
                    {/* LinkedIn */}
                    <a
                      href={member.social.linkedin || undefined}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-gold-dark bg-gold/5 text-gold-dark shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold focus-visible:ring-2 focus-visible:ring-gold/50 ${!member.social.linkedin ? 'opacity-50 pointer-events-none' : ''}`}
                      aria-label="LinkedIn"
                    >
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    {/* Twitter */}
                    <a
                      href={member.social.twitter || undefined}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-gold-dark bg-gold/5 text-gold-dark shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold focus-visible:ring-2 focus-visible:ring-gold/50 ${!member.social.twitter ? 'opacity-50 pointer-events-none' : ''}`}
                      aria-label="Twitter"
                    >
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    {/* Email */}
                    <a
                      href={member.social.email || undefined}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border-2 border-gold-dark bg-gold/5 text-gold-dark shadow-md transition-all duration-200 hover:scale-110 hover:bg-gold/20 hover:border-gold focus-visible:ring-2 focus-visible:ring-gold/50 ${!member.social.email ? 'opacity-50 pointer-events-none' : ''}`}
                      aria-label="Email"
                    >
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg border-2 border-gold mt-16">
          <h2 className="text-3xl font-bold text-navy mb-4">به تیم ما بپیوندید</h2>
          <p className="text-xl mb-8 text-gray-700">ما همیشه به دنبال افراد با استعداد و متخصص هستیم</p>
          <Link to="/contact" className="inline-flex items-center justify-center bg-gold text-navy border-2 border-gold px-8 py-3 rounded-lg font-bold hover:bg-gold-dark hover:text-white transition duration-300">
            <svg className="h-5 w-5 ml-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            ارسال رزومه
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
      </div>

      {/* Orbit Accent */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-2 border-gold shadow-lg opacity-30"></div>
    </div>
  );
}

export default AboutPage; 