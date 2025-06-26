import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || window.location.origin,
  withCredentials: true, // Important for cookies/session
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    method: request.method,
    baseURL: request.baseURL,
    headers: request.headers
  });
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL
      }
    });
    return Promise.reject(error);
  }
);

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