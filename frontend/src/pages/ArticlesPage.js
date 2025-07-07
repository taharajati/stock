import React from 'react';
import { Link } from 'react-router-dom';

function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: 'راهنمای جامع تحلیل تکنیکال در بورس',
      excerpt: 'در این مقاله به بررسی اصول و روش‌های تحلیل تکنیکال در بازار بورس می‌پردازیم...',
      category: 'تحلیل تکنیکال',
      date: '۱۴۰۲/۱۲/۱۵',
      readTime: '۸ دقیقه',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      author: {
        name: 'علی محمدی',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      }
    },
    {
      id: 2,
      title: 'نحوه تحلیل بنیادی شرکت‌های بورسی',
      excerpt: 'بررسی صورت‌های مالی و شاخص‌های مهم در تحلیل بنیادی شرکت‌های بورسی...',
      category: 'تحلیل بنیادی',
      date: '۱۴۰۲/۱۲/۱۰',
      readTime: '۱۰ دقیقه',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      author: {
        name: 'سارا احمدی',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      }
    },
    {
      id: 3,
      title: 'استراتژی‌های مدیریت ریسک در سرمایه‌گذاری',
      excerpt: 'آموزش روش‌های مدیریت ریسک و حفظ سرمایه در بازارهای مالی...',
      category: 'مدیریت ریسک',
      date: '۱۴۰۲/۱۲/۰۵',
      readTime: '۱۲ دقیقه',
      image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      author: {
        name: 'محمد رضایی',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
      }
    }
  ];

  const categories = [
    'همه مقالات',
    'تحلیل تکنیکال',
    'تحلیل بنیادی',
    'مدیریت ریسک',
    'بازارهای جهانی',
    'اقتصاد کلان'
  ];

  return (
    <div className="py-16 rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مقالات آموزشی</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            جدیدترین مقالات و تحلیل‌های بازار سرمایه را مطالعه کنید
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-full text-sm font-bold border-2 transition duration-300 ${
                index === 0
                  ? 'bg-gold text-navy border-gold'
                  : 'bg-white text-gold border-gold hover:bg-gold/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${article.category === 'تحلیل تکنیکال' ? 'border-gold scale-105 z-10' : 'border-navy/20'}`}>
              <div className="relative h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-navy px-3 py-1 rounded-full text-sm font-bold shadow">
                  {article.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-10 h-10 rounded-full ml-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-navy">{article.author.name}</p>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-navy mb-2">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="h-5 w-5 ml-1 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime}
                  </span>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-gold hover:text-gold-dark font-bold"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-white border-2 border-gold rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">خبرنامه هفتگی</h2>
            <p className="text-xl mb-8 text-gray-700">
              برای دریافت جدیدترین مقالات و تحلیل‌های بازار در خبرنامه ما عضو شوید
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-3 rounded-lg text-navy border-2 border-gold focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="bg-gold text-navy border-2 border-gold px-8 py-3 rounded-lg font-bold hover:bg-gold-dark hover:text-white transition duration-300"
              >
                عضویت در خبرنامه
              </button>
            </form>
          </div>
        </div>

        {/* Divider مینیمال طلایی */}
        <div className="w-full flex justify-center my-12">
          <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
        </div>

        {/* Orbit Accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-2 border-gold shadow-lg opacity-30"></div>
      </div>
    </div>
  );
}

export default ArticlesPage; 