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
              className={`px-6 py-2 rounded-full text-sm font-medium transition duration-300 ${
                index === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
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
                    <p className="text-sm font-medium text-gray-800">{article.author.name}</p>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime}
                  </span>
                  <Link
                    to={`/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">خبرنامه هفتگی</h2>
            <p className="text-xl mb-8 opacity-90">
              برای دریافت جدیدترین مقالات و تحلیل‌های بازار در خبرنامه ما عضو شوید
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
              >
                عضویت در خبرنامه
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage; 