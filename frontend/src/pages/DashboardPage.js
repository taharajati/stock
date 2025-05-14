import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyService, newsService } from '../services/api.js';

function DashboardPage() {
  const [companies, setCompanies] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Placeholder market data - would come from API in real app
  const [marketData, setMarketData] = useState({
    mainIndex: { value: 1862435, change: 12574, percent: 0.68 },
    equalIndex: { value: 485632, change: -1284, percent: -0.26 },
    marketValue: 9867, // trillion toman
    tradeValue: 14235, // billion toman 
    topGainers: [
      { name: "خودرو", percent: 4.91 },
      { name: "فولاد", percent: 4.12 },
      { name: "شپنا", percent: 3.87 },
    ],
    topLosers: [
      { name: "خساپا", percent: -4.84 },
      { name: "شستا", percent: -3.92 },
      { name: "ومعادن", percent: -3.64 },
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch companies and news in parallel
        const [companiesResponse, newsResponse] = await Promise.all([
          companyService.getAllCompanies(),
          newsService.getLatestNews(5)
        ]);
        
        setCompanies(companiesResponse.data);
        setNews(newsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-5"></div>
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-xl mb-5">{error}</p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg" 
          onClick={() => window.location.reload()}
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-gray-500 ml-2">آخرین به‌روزرسانی:</span>
          <span className="text-gray-700 font-medium">
            {new Date().toLocaleDateString('fa-IR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Main Index Card */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">شاخص کل</h3>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold text-gray-800 ml-2">
              {marketData.mainIndex.value.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500">واحد</span>
          </div>
          <div className={`flex items-center ${marketData.mainIndex.percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="ml-1">
              {marketData.mainIndex.percent >= 0 ? '↑' : '↓'}
            </span>
            <span className="font-medium">
              {Math.abs(marketData.mainIndex.change).toLocaleString('fa-IR')}
            </span>
            <span className="mr-1">
              ({Math.abs(marketData.mainIndex.percent).toLocaleString('fa-IR')}%)
            </span>
          </div>
        </div>

        {/* Equal Weight Index Card */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">شاخص هم‌وزن</h3>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold text-gray-800 ml-2">
              {marketData.equalIndex.value.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500">واحد</span>
          </div>
          <div className={`flex items-center ${marketData.equalIndex.percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="ml-1">
              {marketData.equalIndex.percent >= 0 ? '↑' : '↓'}
            </span>
            <span className="font-medium">
              {Math.abs(marketData.equalIndex.change).toLocaleString('fa-IR')}
            </span>
            <span className="mr-1">
              ({Math.abs(marketData.equalIndex.percent).toLocaleString('fa-IR')}%)
            </span>
          </div>
        </div>

        {/* Market Value Card */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">ارزش بازار</h3>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold text-gray-800 ml-2">
              {marketData.marketValue.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500">هزار میلیارد تومان</span>
          </div>
          <div className="text-gray-600 text-sm">
            معادل {(marketData.marketValue * 32).toLocaleString('fa-IR')} میلیارد دلار
          </div>
        </div>

        {/* Trade Value Card */}
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">ارزش معاملات</h3>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline mb-2">
            <span className="text-2xl font-bold text-gray-800 ml-2">
              {marketData.tradeValue.toLocaleString('fa-IR')}
            </span>
            <span className="text-sm text-gray-500">میلیارد تومان</span>
          </div>
          <div className="text-gray-600 text-sm">
            حجم معاملات: 5.8 میلیارد سهم
          </div>
        </div>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Gainers Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">بیشترین رشد قیمت</h3>
          <div className="space-y-4">
            {marketData.topGainers.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 ml-3">
                    {index + 1}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-green-600 font-bold">+{item.percent.toLocaleString('fa-IR')}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Losers Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">بیشترین افت قیمت</h3>
          <div className="space-y-4">
            {marketData.topLosers.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 ml-3">
                    {index + 1}
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-red-600 font-bold">{item.percent.toLocaleString('fa-IR')}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">شرکت‌های بورسی</h2>
              <Link to="/companies" className="text-blue-600 hover:text-blue-800 text-sm">
                مشاهده همه &larr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {companies.map(company => (
                <Link 
                  key={company.id} 
                  to={`/companies/${company.id}`}
                  className="bg-gray-50 rounded-lg p-4 hover:-translate-y-1 hover:shadow-md transition duration-300 block border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
                    <div className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                      {company.symbol}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mt-3">
                    <div className="text-gray-500">آخرین قیمت: <span className="text-gray-800 font-medium">
                      {company.lastPrice?.toLocaleString('fa-IR') || 'نامشخص'} ریال
                    </span></div>
                    <div className={`font-medium ${company.priceChange > 0 ? 'text-green-600' : company.priceChange < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {company.priceChange > 0 ? '+' : ''}{company.priceChange?.toLocaleString('fa-IR') || '0'}%
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">آخرین اخبار</h2>
              <Link to="/news" className="text-blue-600 hover:text-blue-800 text-sm">
                مشاهده همه &larr;
              </Link>
            </div>
            <div>
              {news.length > 0 ? (
                news.map((item, index) => (
                  <div key={index} className="py-4 border-b border-gray-100 last:border-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">{item.summary}</p>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:text-blue-800 inline-flex items-center"
                      >
                        ادامه مطلب
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-4">خبری یافت نشد.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 