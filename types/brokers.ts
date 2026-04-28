// data/brokers.ts
export interface Broker {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  minDeposit: string;
  spread: string;
  leverage: string;
  regulation: string[];
  features: string[];
  pros: string[];
  cons: string[];
  websiteUrl: string;
  badge?: string;
}

export const brokers: Broker[] = [
  {
    id: "xm",
    name: "XM",
    logo: "/brokers/xm.png",
    description:
      "Broker forex global dengan regulasi terpercaya dan layanan pelanggan 24/7 dalam Bahasa Indonesia.",
    rating: 4.8,
    minDeposit: "$5",
    spread: "0.6 pips",
    leverage: "1:1000",
    regulation: ["ASIC", "CySEC", "IFSC"],
    features: [
      "Akun Micro & Standard",
      "Trading tanpa requote",
      "Bonus deposit 50%",
      "Edukasi trading gratis",
    ],
    pros: [
      "Spread rendah mulai 0.6 pips",
      "Deposit/withdrawal mudah via lokal bank",
      "Platform MT4 & MT5",
    ],
    cons: ["Terbatasnya instrumen crypto"],
    websiteUrl: "https://www.xm.com",
    badge: "Paling Populer",
  },
  {
    id: "fbs",
    name: "FBS",
    logo: "/brokers/fbs.png",
    description:
      "Broker dengan spread terendah dan berbagai promo menarik untuk trader Indonesia.",
    rating: 4.7,
    minDeposit: "$1",
    spread: "0.0 pips",
    leverage: "1:3000",
    regulation: ["CySEC", "IFSC", "FSCA"],
    features: [
      "Akun Cent untuk pemula",
      "Cashback rebate hingga $15/lot",
      "Bonus tanpa deposit $100",
      "Copy trading tersedia",
    ],
    pros: [
      "Spread 0 pips di akun ECN",
      "Leverage tertinggi 1:3000",
      "Bonus beragam",
    ],
    cons: ["Regulasi tidak sekuat broker besar"],
    websiteUrl: "https://fbs.com",
    badge: "Spread Terendah",
  },
  {
    id: "exness",
    name: "Exness",
    logo: "/brokers/exness.png",
    description:
      "Broker dengan eksekusi instan dan withdrawal super cepat dalam hitungan detik.",
    rating: 4.9,
    minDeposit: "$10",
    spread: "0.0 pips",
    leverage: "1:Unlimited",
    regulation: ["FCA", "CySEC", "FSA", "CBCS"],
    features: [
      "Withdrawal instan 24/7",
      "Akun Standard & Pro",
      "Social Trading",
      "VPS hosting gratis",
    ],
    pros: [
      "Withdrawal tercepat di industri",
      "Eksekusi order instan",
      "Regulasi tier-1 FCA",
    ],
    cons: ["Minimum deposit akun Pro $200"],
    websiteUrl: "https://www.exness.com",
    badge: "Terbaik",
  },
  // {
  //   id: "octa",
  //   name: "OctaFX",
  //   logo: "/brokers/octafx.png",
  //   description:
  //     "Broker ramah pemula dengan platform trading modern dan kompetisi trading berhadiah.",
  //   rating: 4.6,
  //   minDeposit: "$25",
  //   spread: "0.6 pips",
  //   leverage: "1:500",
  //   regulation: ["CySEC", "SVG FSA"],
  //   features: [
  //     "Platform OctaTrader sendiri",
  //     "Kompetisi trading berhadiah",
  //     "Status Level trading",
  //     "Analisis harian gratis",
  //   ],
  //   pros: [
  //     "Platform user-friendly",
  //     "Banyak promo dan kontes",
  //     "Edukasi lengkap untuk pemula",
  //   ],
  //   cons: ["Instrumen terbatas vs broker besar"],
  //   websiteUrl: "https://octafx.com",
  // },
  {
    id: "icmarkets",
    name: "IC Markets",
    logo: "/brokers/icm.jpeg",
    description:
      "Broker ECN terbaik untuk trader profesional dengan spread raw yang kompetitif.",
    rating: 4.8,
    minDeposit: "$200",
    spread: "0.0 pips",
    leverage: "1:500",
    regulation: ["ASIC", "CySEC", "FSA"],
    features: [
      "True ECN execution",
      "Spread raw 0.0 pips",
      "Server di NY4 & LD5",
      "MT4, MT5 & cTrader",
    ],
    pros: [
      "Spread terendah untuk scalping",
      "Eksekusi ultra-cepat",
      "Cocok untuk algo trading",
    ],
    cons: ["Minimum deposit tinggi", "Tidak ada bonus"],
    websiteUrl: "https://www.icmarkets.com",
    badge: "Pro Trader",
  },
  {
    id: "hotforex",
    name: "HFM (HotForex)",
    logo: "/brokers/hfm.jpg",
    description:
      "Broker multi-award dengan berbagai jenis akun untuk semua level trader.",
    rating: 4.7,
    minDeposit: "$5",
    spread: "1.0 pips",
    leverage: "1:1000",
    regulation: ["FCA", "CySEC", "DFSA", "FSA"],
    features: [
      "10+ jenis akun trading",
      "Program loyalty HF Bars",
      "Asuransi deposit gratis",
      "Trading Central analysis",
    ],
    pros: [
      "Pilihan akun sangat beragam",
      "Program reward menarik",
      "Edukasi premium gratis",
    ],
    cons: ["Spread standard agak tinggi"],
    websiteUrl: "https://www.hfm.com",
  },
];
