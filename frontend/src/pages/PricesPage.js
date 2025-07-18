import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedCard from '../components/common/AnimatedCard.jsx';
import AnimatedButton from '../components/common/AnimatedButton.jsx';

function PricesPage() {
  const plans = [
    {
      name: 'رایگان',
      price: 'رایگان',
      description: '',
      features: [
        'نمای بازار روزانه (به زودی)',
        'دسترسی محدود شده به اطلاعات کدال (به زودی)',
        'دسترسی به مقالات',
        'دیدبان بازار اختیار (به زودی)'
      ],
      buttonText: 'ثبت‌نام رایگان',
      buttonLink: '/register',
      popular: false
    },
    {
      name: 'حرفه‌ای - حقیقی',
      price: <span><span className="line-through text-gray-400">25 میلیون تومان</span> <span className="text-green-600 font-bold">12 میلیون</span> <span className="text-xs text-gray-500">برای ثبت‌نام تا ۳۱ دی</span></span>,
      description: '',
      features: [
        'تمام امکانات پلن پایه',
        'دسترسی کامل به پنل صندوق‌های سرمایه‌گذاری (به زودی)',
        'دسترسی به تمام امکانات کدال (به زودی)',
        'دسترسی به تمام امکانات پنل اختیار معامله (به زودی)'
      ],
      buttonText: 'ثبت‌نام حرفه‌ای حقیقی',
      buttonLink: '/register?plan=pro-individual',
      popular: true
    },
    {
      name: 'حرفه‌ای - حقوقی',
      price: <span><span className="line-through text-gray-400">65 میلیون تومان</span> <span className="text-green-600 font-bold">30 میلیون</span> <span className="text-xs text-gray-500">برای ثبت‌نام تا ۳۱ دی</span></span>,
      description: '',
      features: [
        'تمام امکانات پلن پایه (به زودی)',
        'دسترسی کامل به پنل صندوق‌های سرمایه‌گذاری (به زودی)',
        'دسترسی به تمام امکانات کدال (به زودی)',
        'دسترسی به تمام امکانات پنل اختیار معامله (به زودی)'
      ],
      buttonText: 'ثبت‌نام حرفه‌ای حقوقی',
      buttonLink: '/register?plan=pro-legal',
      popular: false
    },
    {
      name: 'سازمان',
      price: 'تماس بگیرید',
      description: '',
      features: [
        'تمام امکانات پنل حرفه‌ای',
        'ارائه گزارشات تخصصی',
        'ارائه گزارشات سفارشی متناسب با نیاز سازمان',
        'بررسی و تحلیل عملکرد پرتفوی بورسی',
        'پشتیبانی اختصاصی',
        'آموزش تخصصی',
        'همکاری در توسعه'
      ],
      buttonText: 'درخواست مشاوره',
      buttonLink: '/contact',
      popular: false
    }
  ];

  return (
    <div className="py-16 rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">تعرفه‌های اشتراک</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            پلن مناسب خود را انتخاب کنید و از امکانات پیشرفته تحلیل بورس بهره‌مند شوید
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <AnimatedCard
              key={index}
              className={`relative rounded-2xl overflow-hidden border-t-4 p-8 text-center bg-theme-white text-theme-dark shadow-lg transition-all duration-300 ${
                plan.popular ? 'border-theme-accent scale-105  z-10' : 'border-theme-accent2'
              } hover:shadow-2xl hover:scale-105 animate-fade-in flex flex-col h-full`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-theme-accent text-theme-dark px-4 py-1 rounded-bl-lg text-sm font-bold shadow">پرفروش‌ترین</span>
              )}
              <div className="w-16 h-16 rounded-full bg-theme-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-theme-dark mb-2">{plan.name}</h3>
              <div className="text-2xl font-extrabold text-theme-accent mb-2">{plan.price}</div>
              <ul className="text-theme-dark text-sm mb-6 space-y-2 text-center flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center justify-center">
                    <svg className="h-5 w-5 text-theme-accent ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <AnimatedButton
                  as={Link}
                  to={plan.buttonLink}
                  className={`bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition-all duration-200 w-full`}
                >
                  {plan.buttonText}
                </AnimatedButton>
              </div>
            </AnimatedCard>
          ))}
        </div>
        {/* Divider مینیمال accent */}
        <div className="w-full flex justify-center my-16">
          <div className="h-px w-16 bg-theme-accent2 shadow-theme-accent2/20 rounded-full"></div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">سؤالات متداول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'آیا می‌توانم پلن خود را تغییر دهم؟',
                a: 'بله، شما می‌توانید در هر زمان پلن خود را ارتقا یا تنزل دهید. تغییرات از ابتدای دوره بعدی اعمال خواهد شد.'
              },
              {
                q: 'آیا امکان بازگشت وجه وجود دارد؟',
                a: 'بله، در صورت عدم رضایت از خدمات، تا ۷ روز پس از خرید می‌توانید درخواست بازگشت وجه دهید.'
              },
              {
                q: 'آیا می‌توانم از API استفاده کنم؟',
                a: 'دسترسی به API در پلن‌های حرفه‌ای و سازمانی امکان‌پذیر است. محدودیت‌های استفاده در مستندات API ذکر شده است.'
              },
              {
                q: 'چگونه می‌توانم پشتیبانی دریافت کنم؟',
                a: 'پشتیبانی از طریق ایمیل، تلفن و چت آنلاین در ساعات اداری ارائه می‌شود. پلن‌های مختلف سطوح متفاوتی از پشتیبانی دارند.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gold">
                <h3 className="text-xl font-bold text-navy mb-4">{item.q}</h3>
                <p className="text-gray-700">{item.a}</p>
            </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">هنوز سؤال دارید؟</h2>
          <p className="text-xl text-gray-700 mb-8">
            تیم پشتیبانی ما آماده پاسخگویی به سؤالات شما هستند
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-gold text-navy border-2 border-gold px-8 py-3 rounded-lg font-bold hover:bg-gold-dark hover:text-white transition duration-300"
          >
            <svg className="h-5 w-5 ml-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            تماس با پشتیبانی
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricesPage; 