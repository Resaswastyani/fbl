const fs = require('fs');

const enPath = 'd:/laragon/www/FBL/messages/en.json';
const idPath = 'd:/laragon/www/FBL/messages/id.json';

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const idData = JSON.parse(fs.readFileSync(idPath, 'utf8'));

// Add missing keys to TradingJournal
enData.TradingJournal.buyNow = "Buy Now via WhatsApp";
enData.TradingJournal.featuredProduct = "Featured Product";
enData.TradingJournal.buyDesc = "Complete Excel file with all features: Dashboard, Trade Log, Monthly Report, Analytics, Calendar & Settings.";

idData.TradingJournal.buyNow = "Beli Sekarang via WhatsApp";
idData.TradingJournal.featuredProduct = "Produk Unggulan";
idData.TradingJournal.buyDesc = "File Excel lengkap dengan Dashboard, Trade Log, Monthly Report, Analytics, Calendar & Settings.";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(idPath, JSON.stringify(idData, null, 2));
console.log('Extra keys added successfully.');
