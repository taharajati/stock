const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Fetches the latest news from sena.ir
 * @param {number} count - Number of news items to retrieve 
 * @returns {Promise<Array>} Array of news items
 */
async function getLatestNews(count = 10) {
  try {
    // In a real implementation, you would use the actual sena.ir URL
    const url = 'https://www.sena.ir/news';
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const newsItems = [];
    
    // Example: scrape news items
    // This is a simplified example; actual implementation would depend on sena.ir structure
    $('.news-item').each((index, element) => {
      if (index >= count) return false; // Limit to requested count
      
      const title = $(element).find('.news-title').text().trim();
      const summary = $(element).find('.news-summary').text().trim();
      const date = $(element).find('.news-date').text().trim();
      const url = $(element).find('.news-title a').attr('href');
      
      newsItems.push({
        title,
        summary,
        date,
        url: url ? `https://www.sena.ir${url}` : null
      });
    });
    
    return newsItems;
  } catch (error) {
    console.error('Error fetching news from Sena:', error);
    return [];
  }
}

/**
 * Searches for news related to a specific company
 * @param {string} companyName - Name of the company to search for
 * @returns {Promise<Array>} Array of related news items
 */
async function searchCompanyNews(companyName) {
  try {
    // In a real implementation, you would use the actual search endpoint
    const url = `https://www.sena.ir/search?q=${encodeURIComponent(companyName)}`;
    
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const newsItems = [];
    
    // Example: scrape search results
    $('.search-result-item').each((index, element) => {
      const title = $(element).find('.result-title').text().trim();
      const summary = $(element).find('.result-summary').text().trim();
      const date = $(element).find('.result-date').text().trim();
      const url = $(element).find('.result-title a').attr('href');
      
      newsItems.push({
        title,
        summary,
        date,
        url: url ? `https://www.sena.ir${url}` : null
      });
    });
    
    return newsItems;
  } catch (error) {
    console.error('Error searching news from Sena:', error);
    return [];
  }
}

/**
 * Fetches full news article content
 * @param {string} articleUrl - URL of the news article
 * @returns {Promise<Object>} News article content
 */
async function getArticleContent(articleUrl) {
  try {
    const response = await axios.get(articleUrl);
    const $ = cheerio.load(response.data);
    
    // Example: extract full article content
    const title = $('.article-title').text().trim();
    const date = $('.article-date').text().trim();
    const author = $('.article-author').text().trim();
    
    // Get all paragraphs in the article body
    const paragraphs = [];
    $('.article-body p').each((index, element) => {
      paragraphs.push($(element).text().trim());
    });
    
    const content = paragraphs.join('\n\n');
    
    return {
      title,
      date,
      author,
      content
    };
  } catch (error) {
    console.error('Error fetching article content from Sena:', error);
    return null;
  }
}

module.exports = {
  getLatestNews,
  searchCompanyNews,
  getArticleContent
}; 