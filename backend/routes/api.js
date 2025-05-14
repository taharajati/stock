const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const scrapers = require('../scrapers');

// Mock data for companies - in a real app, this would come from a database or API
const companies = [
  { id: 'IRO1FOLD0001', name: 'فولاد مبارکه اصفهان', symbol: 'فولاد' },
  { id: 'IRO1PARS0001', name: 'پتروشیمی پارس', symbol: 'پارس' },
  { id: 'IRO1KSHJ0001', name: 'پالایش نفت بندرعباس', symbol: 'شبندر' },
];

// Get all companies
router.get('/companies', isAuthenticated, (req, res) => {
  res.json(companies);
});

// Get a specific company
router.get('/companies/:id', isAuthenticated, (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json(company);
});

// Get company reports from Codal
router.get('/companies/:id/reports', isAuthenticated, async (req, res) => {
  try {
    const reports = await scrapers.codal.getCompanyReports(req.params.id);
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
});

// Get market data from TSETMC
router.get('/companies/:id/market', isAuthenticated, async (req, res) => {
  try {
    const marketData = await scrapers.tsetmc.getMarketData(req.params.id);
    if (!marketData) {
      return res.status(404).json({ error: 'Market data not found' });
    }
    res.json(marketData);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Error fetching market data' });
  }
});

// Get shareholder data
router.get('/companies/:id/shareholders', isAuthenticated, async (req, res) => {
  try {
    const shareholders = await scrapers.tsetmc.getShareholderData(req.params.id);
    res.json(shareholders);
  } catch (error) {
    console.error('Error fetching shareholder data:', error);
    res.status(500).json({ error: 'Error fetching shareholder data' });
  }
});

// Get historical price data
router.get('/companies/:id/historical', isAuthenticated, async (req, res) => {
  try {
    const historicalData = await scrapers.tsetmc.getHistoricalData(req.params.id);
    res.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});

// Get latest news
router.get('/news', isAuthenticated, async (req, res) => {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 10;
    const news = await scrapers.sena.getLatestNews(count);
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

// Search for company news
router.get('/news/search/:company', isAuthenticated, async (req, res) => {
  try {
    const news = await scrapers.sena.searchCompanyNews(req.params.company);
    res.json(news);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Error searching news' });
  }
});

module.exports = router; 