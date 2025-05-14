import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { companyService, newsService } from '../services/api.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CompanyDetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [reports, setReports] = useState([]);
  const [shareholders, setShareholders] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch basic company info first
        const companyResponse = await companyService.getCompany(id);
        setCompany(companyResponse.data);
        
        // Then fetch all other data in parallel
        const [marketResponse, reportsResponse, shareholdersResponse, historicalResponse] = 
          await Promise.all([
            companyService.getCompanyMarketData(id),
            companyService.getCompanyReports(id),
            companyService.getCompanyShareholders(id),
            companyService.getCompanyHistoricalData(id)
          ]);
        
        setMarketData(marketResponse.data);
        setReports(reportsResponse.data);
        setShareholders(shareholdersResponse.data);
        setHistoricalData(historicalResponse.data);
        
        // Fetch news related to this company
        if (company?.name) {
          const newsResponse = await newsService.searchCompanyNews(company.name);
          setNews(newsResponse.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('خطا در دریافت اطلاعات شرکت. لطفاً دوباره تلاش کنید.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, company?.name]);

  const renderPriceChart = () => {
    if (!historicalData || historicalData.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">داده‌ای برای نمایش نمودار وجود ندارد.</p>
        </div>
      );
    }

    // Format data for Chart.js
    const chartData = {
      labels: historicalData.map(item => item.date),
      datasets: [
        {
          label: 'قیمت پایانی',
          data: historicalData.map(item => item.close),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: '#3B82F6',
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'IRANSans, sans-serif',
              size: 12
            }
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#111827',
          bodyColor: '#4B5563',
          borderColor: '#E5E7EB',
          borderWidth: 1,
          padding: 10,
          bodyFont: {
            family: 'IRANSans, sans-serif'
          },
          titleFont: {
            family: 'IRANSans, sans-serif',
            weight: 'bold'
          }
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'IRANSans, sans-serif'
            }
          }
        },
        y: {
          grid: {
            borderDash: [2, 4],
            color: '#E5E7EB'
          },
          ticks: {
            font: {
              family: 'IRANSans, sans-serif'
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    };

    return (
      <div className="h-96">
        <Line options={options} data={chartData} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] rtl">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-5"></div>
        <p className="text-gray-600 text-lg">در حال بارگذاری اطلاعات شرکت...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rtl">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-600 text-xl mb-5">{error}</p>
        <Link 
          to="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rtl">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700 text-xl mb-5">شرکت مورد نظر یافت نشد.</p>
        <Link 
          to="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          بازگشت به داشبورد
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 rtl">
      {/* Company Header Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold ml-4">
                {company.symbol?.substring(0, 1) || 'C'}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{company.name}</h1>
                <div className="flex items-center mt-1">
                  <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                    {company.symbol}
                  </span>
                  {company.industry && (
                    <span className="mr-3 text-gray-600 text-sm">
                      {company.industry}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {marketData && (
            <div className="flex flex-wrap gap-6 mt-6 md:mt-0">
              <div className="market-stat">
                <span className="text-sm text-gray-500 block">آخرین قیمت</span>
                <span className="text-xl font-bold text-gray-800">{marketData.lastPrice?.toLocaleString('fa-IR') || '-'} ریال</span>
              </div>
              
              <div className="market-stat">
                <span className="text-sm text-gray-500 block">تغییر روزانه</span>
                <span className={`text-xl font-bold ${parseFloat(marketData.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {parseFloat(marketData.change) >= 0 ? '+' : ''}{marketData.change?.toLocaleString('fa-IR') || '0'}%
                </span>
              </div>
              
              <div className="market-stat">
                <span className="text-sm text-gray-500 block">حجم معاملات</span>
                <span className="text-xl font-bold text-gray-800">{marketData.volume?.toLocaleString('fa-IR') || '-'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            className={`py-4 px-6 text-sm font-medium ${activeTab === 'overview' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}`}
            onClick={() => setActiveTab('overview')}
          >
            نمای کلی
          </button>
          <button 
            className={`py-4 px-6 text-sm font-medium ${activeTab === 'reports' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}`}
            onClick={() => setActiveTab('reports')}
          >
            گزارش‌های مالی
          </button>
          <button 
            className={`py-4 px-6 text-sm font-medium ${activeTab === 'shareholders' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}`}
            onClick={() => setActiveTab('shareholders')}
          >
            سهامداران
          </button>
          <button 
            className={`py-4 px-6 text-sm font-medium ${activeTab === 'news' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'}`}
            onClick={() => setActiveTab('news')}
          >
            اخبار
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Price Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">نمودار قیمت سهام</h2>
              {renderPriceChart()}
            </div>
            
            {/* Market Data */}
            {marketData && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">اطلاعات بازار</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">قیمت پایانی</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.lastPrice?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">بیشترین قیمت</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.highPrice?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">کمترین قیمت</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.lowPrice?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">ارزش بازار</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.marketCap?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">حجم معاملات</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.volume?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">ارزش معاملات</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.value?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">P/E</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.pe?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 block mb-1">EPS</span>
                    <span className="text-lg font-bold text-gray-800">{marketData.eps?.toLocaleString('fa-IR') || '-'}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Company Profile */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">درباره شرکت</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {company.description || 'اطلاعاتی درباره این شرکت ثبت نشده است.'}
                </p>
                
                {company.website && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {company.website}
                    </a>
                  </div>
                )}
                
                {company.establishedYear && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">سال تأسیس: {company.establishedYear}</span>
                  </div>
                )}
                
                {company.ceo && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-600">مدیرعامل: {company.ceo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">گزارش‌های مالی</h2>
            
            {reports && reports.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        عنوان گزارش
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تاریخ انتشار
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        دوره
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        دانلود
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.publishDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{report.period}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a 
                            href={report.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">هیچ گزارش مالی برای این شرکت ثبت نشده است.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'shareholders' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">سهامداران</h2>
            
            {shareholders && shareholders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        نام سهامدار
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تعداد سهام
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        درصد مالکیت
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        تغییرات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shareholders.map((shareholder, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{shareholder.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{shareholder.shares?.toLocaleString('fa-IR')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{shareholder.percentage}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${parseFloat(shareholder.change) > 0 
                            ? 'text-green-600' 
                            : parseFloat(shareholder.change) < 0 
                              ? 'text-red-600' 
                              : 'text-gray-500'}`}
                          >
                            {parseFloat(shareholder.change) > 0 ? '+' : ''}{shareholder.change}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">اطلاعات سهامداران برای این شرکت ثبت نشده است.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'news' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">اخبار مرتبط با {company.name}</h2>
            
            {news && news.length > 0 ? (
              <div className="space-y-6">
                {news.map((item, index) => (
                  <div key={index} className={`pb-6 ${index !== news.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{item.date}</span>
                      
                      {item.source && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.source}</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{item.summary}</p>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        ادامه مطلب
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5z" />
                  </svg>
                </div>
                <p className="text-gray-500">خبری مرتبط با این شرکت یافت نشد.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDetailPage; 