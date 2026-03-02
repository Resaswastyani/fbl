// data/mentors.ts
export interface Mentor {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  specialization: string[];
  bio: string;
  achievements: string[];
  socialMedia: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  stats: {
    students: string;
    courses: number;
    yearsExperience: number;
  };
  certifications: string[];
}

export const mentors: Mentor[] = [
  {
    id: "budi-santoso",
    name: "Eka Pramudhitya",
    role: "Lead Mentor",
    image: "/mentors/Eka.jpeg",
    experience: "5+ Tahun",
    specialization: [
      "Technical Analysis",
      "Price Action",
      "Risk Management",
      "Trading Psychology",
    ],
    bio: "Eka Pramudhitya adalah founder sekaligus lead mentor di Forex Bisa Lab. Dengan pengalaman lebih dari 15 tahun di industri forex, beliau telah membantu ribuan trader Indonesia mencapai konsistensi profit. Sebelumnya bekerja sebagai institutional trader di salah satu bank investasi terkemuka di Jakarta.",
    achievements: [
      "Mengelola portfolio $50M+",
      "Certified Financial Technician (CFTe)",
      "Speaker di International Trading Expo 2023",
      "Penulis buku 'Mindset Trader Sukses'",
    ],
    socialMedia: {
      instagram: "https://instagram.com/budisantoso.fbl",
      linkedin: "https://linkedin.com/in/budisantoso",
      youtube: "https://youtube.com/@budisantosofbl",
    },
    stats: {
      students: "5,000+",
      courses: 12,
      yearsExperience: 5,
    },
    certifications: ["CFTe", "MSTA", "CFA Level II"],
  },
  {
    id: "dewi-kusuma",
    name: "Desi Oktasari",
    role: "Senior Mentor - Fundamental Analysis",
    image: "/mentors/Desi.jpeg",
    experience: "2+ Tahun",
    specialization: [
      "Fundamental Analysis",
      "Macro Economics",
      "News Trading",
      "Portfolio Diversification",
    ],
    bio: "Desi Oktasari adalah ahli analisis fundamental dengan latar belakang ekonomi internasional dari Universitas Indonesia. Spesialisasi beliau dalam membaca pergerakan market berdasarkan data ekonomi global dan kebijakan bank sentral. Pendekatan mengajarnya yang sistematis sangat cocok untuk trader yang ingin memahami 'mengapa' di balik pergerakan harga.",
    achievements: [
      "Ex-Economist di Bank Indonesia",
      "PhD in International Economics",
      "Top 3 Women Trader Indonesia 2022",
      "Kontributor CNBC Indonesia",
    ],
    socialMedia: {
      instagram: "https://instagram.com/dewikusuma.fbl",
      linkedin: "https://linkedin.com/in/dewikusuma",
      twitter: "https://twitter.com/dewikusumafbl",
    },
    stats: {
      students: "3,200+",
      courses: 8,
      yearsExperience: 2,
    },
    certifications: ["PhD Economics", "FRM", "CMT Level II"],
  },
  // {
  //   id: "andi-wijaya",
  //   name: "Andi Wijaya",
  //   role: "Mentor - Algorithmic Trading",
  //   image: "/mentors/andi-wijaya.jpg",
  //   experience: "8+ Tahun",
  //   specialization: [
  //     "Algorithmic Trading",
  //     "MQL4/MQL5 Programming",
  //     "Automated Strategies",
  //     "Backtesting & Optimization",
  //   ],
  //   bio: "Andi Wijaya adalah spesialis trading otomatis dengan keahlian programming. Beliau mengembangkan berbagai Expert Advisor (EA) dan indikator custom yang digunakan oleh ratusan trader Indonesia. Latar belakang IT-nya memberikan keunggulan dalam mengajarkan trader membuat sistem trading otomatis mereka sendiri.",
  //   achievements: [
  //     "Developer 50+ profitable EA",
  //     "Microsoft Certified Professional",
  //     "Winner Forex Robot Championship 2021",
  //     "Trainer resmi MetaQuotes",
  //   ],
  //   socialMedia: {
  //     instagram: "https://instagram.com/andiwijaya.fbl",
  //     linkedin: "https://linkedin.com/in/andiwijaya",
  //     youtube: "https://youtube.com/@andiwijayafbl",
  //   },
  //   stats: {
  //     students: "2,800+",
  //     courses: 6,
  //     yearsExperience: 8,
  //   },
  //   certifications: ["MCP", "MetaQuotes Certified", "Python for Finance"],
  // },
];
