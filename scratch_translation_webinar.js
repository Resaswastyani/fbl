const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../messages/en.json');
const idPath = path.join(__dirname, '../messages/id.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const idData = JSON.parse(fs.readFileSync(idPath, 'utf8'));

const webinarEn = {
  exclusive: "Exclusive Webinar • 100% Free",
  title1: "FOREX TRADING",
  title2: "ROBOT",
  subtitle: "Opportunities, Risks & How It Actually Works",
  date: "July 20, 2026",
  time: "19.00 - 21.00 WIB",
  location: "Google Meet (Link via WA Group)",
  days: "DAYS",
  hours: "HOURS",
  minutes: "MINS",
  seconds: "SECS",
  benefitTitle: "Exclusive Benefits (FREE):",
  benefit1: "Professional Forex Trading Material",
  benefit2: "Position Size Calculator .ex4 & .ex5",
  benefit3: "30-Day Free Trial Trading Robot",
  speakersHost: "Speakers & Host",
  speakerRole: "Speaker",
  hostRole: "Host",
  qrAlt: "Registration QR Code",
  registerNow: "Register Now",
  limitedSlot: "Limited slots! Register before it runs out."
};

const webinarId = {
  exclusive: "Webinar Eksklusif • 100% Gratis",
  title1: "ROBOT TRADING",
  title2: "FOREX",
  subtitle: "Peluang, Risiko & Cara Kerja Sebenarnya",
  date: "20 Juli 2026",
  time: "19.00 - 21.00 WIB",
  location: "Google Meet (Link via WA Group)",
  days: "HARI",
  hours: "JAM",
  minutes: "MENIT",
  seconds: "DETIK",
  benefitTitle: "Benefit Eksklusif (GRATIS):",
  benefit1: "Materi Profesional Trading Forex",
  benefit2: "Position Size Calculator .ex4 & .ex5",
  benefit3: "Free Trial Robot Trading 30 Hari",
  speakersHost: "Pembicara & Host",
  speakerRole: "Pemateri",
  hostRole: "Host",
  qrAlt: "QR Code Pendaftaran",
  registerNow: "Daftar Sekarang",
  limitedSlot: "Slot terbatas! Daftar sebelum kehabisan."
};

enData.WebinarPopup = webinarEn;
idData.WebinarPopup = webinarId;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(idPath, JSON.stringify(idData, null, 2));
console.log('Webinar dictionaries updated successfully.');
