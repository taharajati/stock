import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://easyvest.ir',
  withCredentials: true, // Important for cookies/session
  headers: {
    'Content-Type': 'application/json',
  }
});

// API services for companies
export const companyService = {
  getAllCompanies: () => api.get('/api/companies'),
  getCompany: (id) => api.get(`/api/companies/${id}`),
  getCompanyReports: (id) => api.get(`/api/companies/${id}/reports`),
  getCompanyMarketData: (id) => api.get(`/api/companies/${id}/market`),
  getCompanyShareholders: (id) => api.get(`/api/companies/${id}/shareholders`),
  getCompanyHistoricalData: (id) => api.get(`/api/companies/${id}/historical`),
};

// API services for news
export const newsService = {
  getLatestNews: (count = 10) => api.get(`/api/news?count=${count}`),
  searchCompanyNews: (companyName) => api.get(`/api/news/search/${companyName}`),
};

export default api; 