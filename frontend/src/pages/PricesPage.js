import React from 'react';
import { Link } from 'react-router-dom';

function PricesPage() {
  const plans = [
    {
      name: 'پایه',
      price: 'رایگان',
      description: 'مناسب برای شروع کار با تحلیل بورس',
      features: [
        'دسترسی به داده‌های پایه بازار',
        'مشاهده قیمت‌های لحظه‌ای',
        'تحلیل‌های ساده تکنیکال',
        'خبرنامه هفتگی',
        'پشتیبانی ایمیلی'
      ],
      buttonText: 'شروع رایگان',
      buttonLink: '/register',
      popular: false
    },
    {
      name: 'حرفه‌ای',
      price: '۹۹ هزار تومان',
      period: 'ماهانه',
      description: 'مناسب برای معامله‌گران حرفه‌ای',
      features: [
        'تمام امکانات پلن پایه',
        'تحلیل‌های پیشرفته تکنیکال',
        'تحلیل‌های بنیادی کامل',
        'سیگنال‌های معاملاتی',
        'پشتیبانی تلفنی',
        'دسترسی به API',
        'خبرنامه روزانه'
      ],
      buttonText: 'انتخاب پلن حرفه‌ای',
      buttonLink: '/register?plan=pro',
      popular: true
    },
    {
      name: 'سازمانی',
      price: 'تماس بگیرید',
      description: 'مناسب برای شرکت‌ها و سازمان‌ها',
      features: [
        'تمام امکانات پلن حرفه‌ای',
        'داشبورد اختصاصی',
        'پشتیبانی اختصاصی',
        'API اختصاصی',
        'گزارش‌های سفارشی',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                plan.popular ? 'border-gold z-10 scale-105' : 'border-navy/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gold text-navy px-4 py-1 rounded-bl-lg text-sm font-bold shadow">
                  پرفروش‌ترین
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-navy">{plan.name}</h3>
                <div className="mb-4">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-gold' : 'text-navy'}`}>{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 text-lg mr-1">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-700 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="h-5 w-5 text-gold ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.buttonLink}
                  className={`block w-full py-3 px-6 text-center rounded-lg font-bold transition duration-300 border-2 ${
                    plan.popular
                      ? 'bg-gold text-navy border-gold hover:bg-gold-dark hover:text-white'
                      : 'bg-white text-gold border-gold hover:bg-gold/10'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Divider مینیمال طلایی */}
        <div className="w-full flex justify-center my-16">
          <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
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