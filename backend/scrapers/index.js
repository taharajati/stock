const codalScraper = require('./codal');
const tsetmcScraper = require('./tsetmc');
const senaScraper = require('./sena');
 
module.exports = {
  codal: codalScraper,
  tsetmc: tsetmcScraper,
  sena: senaScraper
}; 