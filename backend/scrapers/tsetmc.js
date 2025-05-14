const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Fetches market data from tsetmc.com for a given company
 * @param {string} companyId - The ID or symbol of the company
 * @returns {Promise<Object>} Market data for the company
 */
async function getMarketData(companyId) {
  try {
    // In a real implementation, you would use the actual tsetmc.com URL and parameters
    // This is a placeholder implementation
    const url = `http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=${encodeURIComponent(companyId)}`;
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Example: extract market data
    // In reality, TSETMC has a more complex structure and might require more sophisticated scraping
    const marketData = {
      lastPrice: $('#d07').text().trim(),
      change: $('#d08').text().trim(),
      highPrice: $('#d04').text().trim(),
      lowPrice: $('#d05').text().trim(),
      volume: $('#d09').text().trim(),
      value: $('#d10').text().trim(),
      openPrice: $('#d03').text().trim(),
      yesterdayPrice: $('#d02').text().trim(),
      companyName: $('.symbol-name').text().trim()
    };
    
    return marketData;
  } catch (error) {
    console.error('Error fetching market data from TSETMC:', error);
    return null;
  }
}

/**
 * Gets shareholder composition data for a company
 * @param {string} companyId - The ID or symbol of the company
 * @returns {Promise<Array>} Array of shareholders with their percentages
 */
async function getShareholderData(companyId) {
  try {
    // In a real implementation, you would use actual URL and parameters
    const url = `http://www.tsetmc.com/Loader.aspx?ParTree=15131I&i=${encodeURIComponent(companyId)}`;
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Example scraping of shareholder data
    const shareholders = [];
    
    // This is a simplified example - in reality would need to find the right table
    $('.shareholders-table tr').each((index, element) => {
      if (index === 0) return; // Skip header row
      
      const shareholderName = $(element).find('td:nth-child(1)').text().trim();
      const sharePercentage = $(element).find('td:nth-child(2)').text().trim();
      const shareCount = $(element).find('td:nth-child(3)').text().trim();
      
      shareholders.push({
        name: shareholderName,
        percentage: sharePercentage,
        count: shareCount
      });
    });
    
    return shareholders;
  } catch (error) {
    console.error('Error fetching shareholder data from TSETMC:', error);
    return [];
  }
}

/**
 * Gets historical price data for a company
 * @param {string} companyId - The ID or symbol of the company
 * @returns {Promise<Array>} Array of historical price data points
 */
async function getHistoricalData(companyId) {
  try {
    // In a real implementation, use the actual API endpoint
    // TSETMC likely has different endpoints for historical data
    const url = `http://www.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${encodeURIComponent(companyId)}`;
    
    const response = await axios.get(url);
    
    // Data likely comes as CSV or another format
    // Here's an example of parsing CSV-like data
    const lines = response.data.split(';');
    const historicalData = lines.map(line => {
      const [date, high, low, close, open, volume] = line.split(',');
      return { date, high, low, close, open, volume };
    });
    
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data from TSETMC:', error);
    return [];
  }
}

module.exports = {
  getMarketData,
  getShareholderData,
  getHistoricalData
}; 