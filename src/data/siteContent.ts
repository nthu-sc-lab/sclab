import { filterPapers, paperPublicationYears, papers } from "../lib/papers";

export interface LocalizedText {
  readonly zh: string;
  readonly en: string;
}

export interface SourceReference {
  readonly label: string;
  readonly url: string;
}

export type RecentResearchAreaId =
  | "efficient-generative-ai"
  | "physical-ai-robotics"
  | "ai-semiconductor-design"
  | "event-3d-vision";

export interface ResearchArea {
  readonly id: RecentResearchAreaId;
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly topics: readonly LocalizedText[];
}

export interface GalleryPhoto {
  readonly id: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly label: string;
  readonly title: string;
  readonly year: string;
  readonly category: "group" | "event" | "life" | "campus";
  readonly source?: string;
}

export const sources = {
  professor: {
    label: "Professor profile",
    url: "https://www.cs.nthu.edu.tw/~scchang/",
  },
  researchActivity: {
    label: "Academic honors page",
    url: "https://www.cs.nthu.edu.tw/~scchang/research_activity.html",
  },
  nthuNews: {
    label: "NTHU bulletin",
    url: "https://www.nthu.edu.tw/periodical/index/102",
  },
  nthu2016ResearchAward: {
    label: "NTHU research award news",
    url: "https://www.nthu.edu.tw/hotNews/content/34",
  },
  nthuEecs: {
    label: "NTHU EECS bulletin",
    url: "https://eecs.site.nthu.edu.tw/p/405-1005-291496,c148.php?Lang=zh-tw",
  },
  mostAwardProfile: {
    label: "MOST award profile",
    url: "https://02232568002016b.xlog.com.tw/images/files/11125.pdf",
  },
  itri: {
    label: "工業技術研究院經營團隊",
    url: "https://www.itri.org.tw/ListStyle.aspx?DisplayStyle=01_content&MGID=1162141307626510443&MmmID=1036233406517556313&SiteID=1",
  },
  oldLab: {
    label: "Laboratory archive",
    url: "https://sites.google.com/site/nthuvlsisclab/",
  },
  nthuLabs: {
    label: "NTHU CS Laboratory Directory",
    url: "https://dcs-en.site.nthu.edu.tw/p/405-1010-5883,c1615.php",
  },
  tiara: {
    label: "臺灣半導體產學研發聯盟",
    url: "https://www.tiara.org.tw/",
  },
  courseCatalog: {
    label: "NTHU course database",
    url: "https://curricul.site.nthu.edu.tw/p/406-1208-290365,r7880.php?Lang=zh-tw",
  },
  courseArchive: {
    label: "NTHU course archive",
    url: "https://curricul.site.nthu.edu.tw/p/404-1208-111356.php?Lang=zh-tw",
  },
  advancedDigitalCourse: {
    label: "NTHU eLearn course record",
    url: "https://elearn.nthu.edu.tw/course/info.php?id=8241",
  },
  computerEngineeringProgram: {
    label: "NTHU Computer Engineering Program",
    url: "https://u-eecs.site.nthu.edu.tw/p/404-1176-128485.php?Lang=zh-tw",
  },
  tecoAward: {
    label: "32nd TECO Award laureates",
    url: "https://teco.tecofound.org.tw/zh-tw/pages/9/337",
  },
  nthuTecoAward: {
    label: "NTHU · 32nd TECO Award",
    url: "https://www.facebook.com/nthu.tw/posts/1269637851859144/",
  },
} satisfies Record<string, SourceReference>;

const RECENT_RESEARCH_AREA_DEFINITIONS: readonly (ResearchArea & {
  readonly patterns: readonly RegExp[];
})[] = [
  {
    id: "efficient-generative-ai",
    title: {
      zh: "高效生成式 AI 與模型壓縮",
      en: "Efficient Generative AI & Model Compression",
    },
    summary: {
      zh: "面向大型語言模型與新型神經網路，研究混合精度量化、參數縮減、稀疏運算與高效率推論。",
      en: "Efficient inference for large language models and emerging neural networks through mixed-precision quantization, parameter reduction, and sparse computation.",
    },
    topics: [
      { zh: "大型語言模型壓縮", en: "LLM Compression" },
      { zh: "混合精度量化", en: "Mixed-Precision Quantization" },
      { zh: "高效率 Transformer 推論", en: "Efficient Transformer Inference" },
      { zh: "稀疏與動態神經網路", en: "Sparse & Dynamic Neural Networks" },
    ],
    patterns: [
      /大型語言|LLM|Transformer|Softmax|量化|模型壓縮|參數縮減|稀疏矩陣|圖神經|神經架構|高效推論/iu,
      /language model|quantization|compression|sparse|graph neural|neural architecture|efficient inference/iu,
    ],
  },
  {
    id: "physical-ai-robotics",
    title: {
      zh: "實體 AI 與智慧機器人",
      en: "Physical AI & Intelligent Robotics",
    },
    summary: {
      zh: "結合物理先驗、三維場景理解與學習式排序，提升機器人六自由度抓取生成的可靠度與效率。",
      en: "Reliable and efficient 6-DoF robotic grasp generation using physical priors, 3D scene understanding, and learning-based ranking.",
    },
    topics: [
      { zh: "六自由度抓取生成", en: "6-DoF Grasp Generation" },
      { zh: "物理資訊學習", en: "Physics-Informed Learning" },
      { zh: "機器人感知", en: "Robot Perception" },
      { zh: "具身智慧", en: "Embodied Intelligence" },
    ],
    patterns: [
      /抓取|六自由度|物理特徵|機器人|具身/iu,
      /grasp|6-DoF|physics-informed|robot|embodied/iu,
    ],
  },
  {
    id: "ai-semiconductor-design",
    title: {
      zh: "AI 驅動半導體設計",
      en: "AI for Semiconductor Design",
    },
    summary: {
      zh: "以機器學習建立晶片與封裝的快速預測模型，涵蓋 Chiplet 互連、動態壓降、多角時序與電源完整性。",
      en: "Machine-learning models for chip and package analysis, spanning chiplet interconnects, dynamic IR drop, multi-corner timing, and power integrity.",
    },
    topics: [
      { zh: "Chiplet 互連建模", en: "Chiplet Interconnect Modeling" },
      { zh: "動態壓降預測", en: "Dynamic IR-Drop Prediction" },
      { zh: "多角時序預測", en: "Multi-Corner Timing Prediction" },
      { zh: "半導體數位分身", en: "Semiconductor Digital Twins" },
    ],
    patterns: [
      /晶粒|Chiplet|封裝|壓降|時序|電源分佈|阻抗|電容器|散射參數|內存計算|矽後校/iu,
      /chiplet|package|IR-?drop|timing|power distribution|impedance|S-Parameter|computing-in-memory|post-silicon/iu,
    ],
  },
  {
    id: "event-3d-vision",
    title: {
      zh: "事件視覺與 3D 感知",
      en: "Event Vision & 3D Perception",
    },
    summary: {
      zh: "運用事件相機、時空注意力與單目幾何線索，處理深度估計、惡劣天候視覺與三維人物建模。",
      en: "Event cameras, spatiotemporal attention, and monocular geometry for depth estimation, adverse-weather vision, and 3D human modeling.",
    },
    topics: [
      { zh: "事件相機", en: "Event Cameras" },
      { zh: "單目深度估計", en: "Monocular Depth Estimation" },
      { zh: "時空注意力", en: "Spatiotemporal Attention" },
      { zh: "3D 人物建模", en: "3D Human Modeling" },
    ],
    patterns: [
      /事件相機|事件視覺|深度估計|單張圖像|3D人體|人體模型|除雨/iu,
      /event camera|event-based|depth estimation|3D avatar|3D human|deraining/iu,
    ],
  },
];

const newestResearchYear = paperPublicationYears[0] ?? new Date().getFullYear();

export const recentResearchPeriod = {
  from: newestResearchYear - 4,
  to: newestResearchYear,
} as const;

export const recentResearchPapers = filterPapers(papers, {
  publicationYearFrom: recentResearchPeriod.from,
  publicationYearTo: recentResearchPeriod.to,
});

export const recentResearchCounts: Readonly<
  Record<RecentResearchAreaId, number>
> = RECENT_RESEARCH_AREA_DEFINITIONS.reduce(
  (counts, area) => ({
    ...counts,
    [area.id]: recentResearchPapers.filter((paper) => {
      const searchableText = [
        paper.title,
        paper.englishTitle,
        ...paper.tags,
      ].join(" ");
      return area.patterns.some((pattern) => pattern.test(searchableText));
    }).length,
  }),
  {} as Record<RecentResearchAreaId, number>,
);

export const researchAreas: readonly ResearchArea[] =
  RECENT_RESEARCH_AREA_DEFINITIONS.map((area) => ({
    id: area.id,
    title: area.title,
    summary: area.summary,
    topics: area.topics,
  }));

export const coursesTaught = [
  {
    code: "EECS1010",
    zh: "邏輯設計",
    en: "Logic Design",
    credits: 3,
    area: "DIGITAL FOUNDATION",
    summary:
      "從布林代數、組合與循序邏輯，建立數位系統及硬體描述語言的核心基礎。",
    period: "selected",
    source: sources.courseCatalog,
  },
  {
    code: "CS5140",
    zh: "高等數位電路設計與驗證",
    en: "Advanced Digital Design and Verification",
    credits: 3,
    area: "ADVANCED DIGITAL DESIGN",
    summary: "面向進階數位電路的設計方法、驗證流程與系統層級實作。",
    period: "selected",
    source: sources.advancedDigitalCourse,
  },
  {
    code: "CS3130",
    zh: "積體電路電腦輔助設計導論",
    en: "Introduction to Computer-Aided Design of Integrated Circuits",
    credits: 3,
    area: "EDA / CAD",
    summary: "介紹積體電路設計自動化的核心問題、演算法與設計流程。",
    period: "selected",
    source: sources.computerEngineeringProgram,
  },
  {
    code: "CS3120",
    zh: "積體電路設計概論",
    en: "Introduction to Integrated Circuit Design",
    credits: 3,
    area: "VLSI DESIGN",
    summary: "涵蓋 CMOS 邏輯、電路特性、實體佈局與積體電路驗證的基礎。",
    period: "selected",
    source: sources.courseArchive,
  },
  {
    code: "CS4100",
    zh: "計算機結構",
    en: "Computer Architecture",
    credits: 3,
    area: "COMPUTER ARCHITECTURE",
    summary: "從處理器、記憶體階層到系統效能，理解軟硬體介面的設計取捨。",
    period: "selected",
    source: sources.courseCatalog,
  },
  {
    code: "CS2104",
    zh: "硬體實驗",
    en: "Hardware Lab.",
    credits: 2,
    area: "HARDWARE LAB",
    summary: "以 Verilog、FPGA 與上機實作銜接邏輯設計，屬早期課程名稱與課號。",
    period: "earlier",
    source: sources.courseArchive,
  },
  {
    code: "CS3120",
    zh: "積體電路設計簡介",
    en: "Introduction to Integrated Circuit Design",
    credits: 3,
    area: "FORMER COURSE TITLE",
    summary: "積體電路設計概論的早期課名，保留於歷史授課紀錄中。",
    period: "earlier",
    source: sources.courseArchive,
  },
] as const;

export const professor = {
  name: { zh: "張世杰 教授", en: "Prof. Shih-Chieh Chang" },
  title: {
    zh: "國立清華大學資訊工程學系、半導體研究學院教授",
    en: "Professor of Computer Science and the College of Semiconductor Research, NTHU",
  },
  introduction: {
    zh: "張世杰教授於國立臺灣大學取得電機學士，並於美國加州大學聖塔芭芭拉分校取得電機博士。曾任職 Synopsys 與國立中正大學，研究橫跨 VLSI/EDA、低功耗 AI、智慧感知、半導體數位分身與機器人系統。",
    en: "Professor Chang received his B.S. from National Taiwan University and Ph.D. from UC Santa Barbara. His work spans VLSI/EDA, low-power AI, intelligent perception, semiconductor digital twins, and robotics.",
  },
  email: "scchang@cs.nthu.edu.tw",
  phone: "03-5742964",
  office: "Tai-Da Building 619",
  education: [
    "Ph.D., Electrical Engineering, University of California, Santa Barbara, 1994",
    "B.S., Electrical Engineering, National Taiwan University, 1987",
  ],
  source: sources.professor,
} as const;

export const professorPhoto = {
  local: `${import.meta.env.BASE_URL}professor-portrait.png`,
  member: `${import.meta.env.BASE_URL}professor-portrait.png`,
  fallback: "https://cosr.site.nthu.edu.tw/var/file/536/1536/img/858960265.png",
} as const;

// Gallery web assets live in public/gallery/. Prefer WebP files around 1600–1920px wide.
export const galleryPhotos: readonly GalleryPhoto[] = [
  {
    id: "graduation-02",
    src: `${import.meta.env.BASE_URL}gallery/graduation-02.webp`,
    width: 1328,
    height: 630,
    alt: "張世杰教授與另一組穿著學位服的畢業生合影",
    label: "GRADUATION",
    title: "畢業合照",
    year: "2025",
    category: "group",
  },
  {
    id: "alumni-homecoming",
    src: `${import.meta.env.BASE_URL}gallery/alumni-homecoming.webp`,
    width: 1117,
    height: 514,
    alt: "SCLab 師生與系友於教室內合影",
    label: "ALUMNI HOMECOMING",
    title: "實驗室回娘家",
    year: "LAB ARCHIVE",
    category: "event",
  },
] as const;

export const campusPhotos = galleryPhotos.filter(
  (photo) => photo.category === "campus",
);

export const professorMilestones = [
  {
    period: "2022–Present",
    title: "工研院電子與光電系統研究所所長",
    english:
      "Director, Electronic and Optoelectronic System Research Laboratories, ITRI",
    source: sources.itri,
  },
  {
    period: "2021–Present",
    title: "國立清華大學半導體研究學院副院長／教授",
    english: "Vice Dean / Professor, College of Semiconductor Research, NTHU",
    source: sources.itri,
  },
  {
    period: "2018–2022",
    title: "清華大學人工智慧研發中心主任",
    english: "Director, Artificial Intelligence Research Center, NTHU",
    source: sources.professor,
  },
  {
    period: "2012–2015",
    title: "清華大學資訊工程學系系主任",
    english: "Chair, Department of Computer Science, NTHU",
    source: sources.professor,
  },
  {
    period: "1996–2001",
    title: "國立中正大學資訊工程學系副教授",
    english: "Associate Professor, National Chung Cheng University",
    source: sources.itri,
  },
  {
    period: "1994–1996",
    title: "Synopsys USA 資深工程師",
    english: "Senior Engineer, Synopsys, USA",
    source: sources.itri,
  },
] as const;

export const industryNetwork = [
  {
    title: { zh: "清大學術研究", en: "NTHU Academic Research" },
    description: {
      zh: "教授個人研究資料記錄研究成果、研究興趣與學術任職資訊。",
      en: "The professor profile records research interests, publications, and academic appointments.",
    },
    source: sources.professor,
  },
  {
    title: { zh: "工研院產業研發", en: "ITRI Industrial R&D" },
    description: {
      zh: "電子與光電系統研究所聚焦 AI 晶片、異質整合、化合物半導體、晶片設計與智慧顯示等前瞻技術。",
      en: "ITRI links the group to AI chips, heterogeneous integration, compound semiconductors, and advanced systems.",
    },
    source: sources.itri,
  },
  {
    title: { zh: "半導體產學鏈結", en: "Semiconductor Collaboration" },
    description: {
      zh: "TIARA 推動半導體產學合作、人才培育、技術交流與青年研究論壇，提供研究與產業對接平台。",
      en: "TIARA supports university–industry collaboration, talent development, and semiconductor research exchange.",
    },
    source: sources.tiara,
  },
  {
    title: { zh: "VLSI/CAD 研究社群", en: "VLSI/CAD Research Community" },
    description: {
      zh: "清大資工系將 VLSI/CAD Laboratory 列為跨多位教授的研究群，核心聚焦 VLSI 設計與 CAD。",
      en: "NTHU Computer Science lists VLSI/CAD as a broader faculty research community in chip design and CAD.",
    },
    source: sources.nthuLabs,
  },
] as const;
