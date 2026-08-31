export interface LocalizedText {
  readonly zh: string
  readonly en: string
}

export interface SourceReference {
  readonly label: string
  readonly url: string
}

export interface ResearchArea {
  readonly id: string
  readonly title: LocalizedText
  readonly summary: LocalizedText
  readonly topics: readonly LocalizedText[]
}

export const sources = {
  professor: {
    label: '張世杰教授官方首頁',
    url: 'https://www.cs.nthu.edu.tw/~scchang/',
  },
  scholars: {
    label: '國立清華大學學者系統',
    url: 'https://scholars.nthu.edu.tw/esploro/profile/shihchieh_chang',
  },
  itri: {
    label: '工業技術研究院經營團隊',
    url: 'https://www.itri.org.tw/ListStyle.aspx?DisplayStyle=01_content&MGID=1162141307626510443&MmmID=1036233406517556313&SiteID=1',
  },
  oldLab: {
    label: 'VLSI/CAD Lab 舊站',
    url: 'https://sites.google.com/site/nthuvlsisclab/',
  },
  nthuLabs: {
    label: 'NTHU CS Laboratory Directory',
    url: 'https://dcs-en.site.nthu.edu.tw/p/405-1010-5883,c1615.php',
  },
  tiara: {
    label: '臺灣半導體產學研發聯盟',
    url: 'https://www.tiara.org.tw/',
  },
} satisfies Record<string, SourceReference>

export const researchAreas: readonly ResearchArea[] = [
  {
    id: 'deep-learning',
    title: { zh: '深度學習與智慧感知', en: 'Deep Learning & Intelligent Perception' },
    summary: {
      zh: '從強健神經網路、語音辨識到自然語言模型，探索能在真實雜訊與變異下工作的智慧系統。',
      en: 'Robust neural systems for speech, language, and perception under real-world noise and variation.',
    },
    topics: [
      { zh: '抗雜訊與變異神經網路', en: 'Noise- and variation-robust neural networks' },
      { zh: '語音辨識與音訊 AI', en: 'Speech recognition and audio AI' },
      { zh: '自然語言建模', en: 'Natural language modeling' },
    ],
  },
  {
    id: 'ai-architecture',
    title: { zh: 'AI 模型與低功耗架構', en: 'AI Models & Low-Power Architecture' },
    summary: {
      zh: '共同設計模型、演算法與硬體，降低推論成本並提升部署效率、可靠度與可解釋性。',
      en: 'Co-designing models, algorithms, and hardware for efficient and dependable AI deployment.',
    },
    topics: [
      { zh: '低功耗 AI 估算與架構', en: 'Low-power AI estimation and architecture' },
      { zh: '模型壓縮與硬體感知搜尋', en: 'Compression and hardware-aware architecture search' },
      { zh: 'AI 失效分析與推薦系統', en: 'AI failure analysis and recommendation systems' },
    ],
  },
  {
    id: 'vlsi-eda',
    title: { zh: 'VLSI 設計與設計自動化', en: 'VLSI Design & Design Automation' },
    summary: {
      zh: '針對老化、雜訊、熱效應、功耗與時序變異，發展可落地於晶片設計流程的分析與最佳化方法。',
      en: 'Analysis and optimization for aging, noise, thermal effects, power, and timing variation.',
    },
    topics: [
      { zh: '電源完整性與功耗閘控', en: 'Power integrity and power gating' },
      { zh: '時序變異容忍設計', en: 'Delay-variation tolerant design' },
      { zh: '可靠度、老化與熱分析', en: 'Reliability, aging, and thermal analysis' },
    ],
  },
  {
    id: 'digital-twin',
    title: { zh: '半導體數位分身與機器人', en: 'Semiconductor Digital Twins & Robotics' },
    summary: {
      zh: '連結模擬與實體系統，研究半導體數位分身、機器手臂 sim-to-real 與硬體迴路驗證。',
      en: 'Connecting simulation and physical systems through semiconductor digital twins and robotics.',
    },
    topics: [
      { zh: '半導體數位分身', en: 'Digital twins for semiconductors' },
      { zh: '機器手臂 sim-to-real', en: 'Robot-arm sim-to-real and real-to-sim' },
      { zh: '硬體迴路設計', en: 'Hardware-in-the-loop design' },
    ],
  },
]

export const professor = {
  name: { zh: '張世杰 教授', en: 'Prof. Shih-Chieh Chang' },
  title: {
    zh: '國立清華大學資訊工程學系、半導體研究學院教授',
    en: 'Professor of Computer Science and the College of Semiconductor Research, NTHU',
  },
  introduction: {
    zh: '張世杰教授於國立臺灣大學取得電機學士，並於美國加州大學聖塔芭芭拉分校取得電機博士。曾任職 Synopsys 與國立中正大學，研究橫跨 VLSI/EDA、低功耗 AI、智慧感知、半導體數位分身與機器人系統。',
    en: 'Professor Chang received his B.S. from National Taiwan University and Ph.D. from UC Santa Barbara. His work spans VLSI/EDA, low-power AI, intelligent perception, semiconductor digital twins, and robotics.',
  },
  email: 'scchang@cs.nthu.edu.tw',
  phone: '03-5742964',
  office: 'Tai-Da Building 619',
  education: [
    'Ph.D., Electrical Engineering, University of California, Santa Barbara, 1994',
    'B.S., Electrical Engineering, National Taiwan University, 1987',
  ],
  source: sources.professor,
} as const

export const professorMilestones = [
  {
    period: '2022–Present',
    title: '工研院電子與光電系統研究所所長',
    english: 'Director, Electronic and Optoelectronic System Research Laboratories, ITRI',
    source: sources.itri,
  },
  {
    period: '2021–Present',
    title: '國立清華大學半導體研究學院副院長／教授',
    english: 'Vice Dean / Professor, College of Semiconductor Research, NTHU',
    source: sources.itri,
  },
  {
    period: '2018–2022',
    title: '清華大學人工智慧研發中心主任',
    english: 'Director, Artificial Intelligence Research Center, NTHU',
    source: sources.scholars,
  },
  {
    period: '2012–2015',
    title: '清華大學資訊工程學系系主任',
    english: 'Chair, Department of Computer Science, NTHU',
    source: sources.scholars,
  },
  {
    period: '1996–2001',
    title: '國立中正大學資訊工程學系副教授',
    english: 'Associate Professor, National Chung Cheng University',
    source: sources.itri,
  },
  {
    period: '1994–1996',
    title: 'Synopsys USA 資深工程師',
    english: 'Senior Engineer, Synopsys, USA',
    source: sources.itri,
  },
] as const

export const industryNetwork = [
  {
    title: { zh: '清大學術研究', en: 'NTHU Academic Research' },
    description: {
      zh: '清大學者系統收錄研究成果、榮譽、教學與服務紀錄，並確認教授於資工系與半導體研究學院的研究單位。',
      en: 'The NTHU Scholars profile connects publications, honors, teaching, and institutional affiliations.',
    },
    source: sources.scholars,
  },
  {
    title: { zh: '工研院產業研發', en: 'ITRI Industrial R&D' },
    description: {
      zh: '電子與光電系統研究所聚焦 AI 晶片、異質整合、化合物半導體、晶片設計與智慧顯示等前瞻技術。',
      en: 'ITRI links the group to AI chips, heterogeneous integration, compound semiconductors, and advanced systems.',
    },
    source: sources.itri,
  },
  {
    title: { zh: '半導體產學鏈結', en: 'Semiconductor Collaboration' },
    description: {
      zh: 'TIARA 推動半導體產學合作、人才培育、技術交流與青年研究論壇，提供研究與產業對接平台。',
      en: 'TIARA supports university–industry collaboration, talent development, and semiconductor research exchange.',
    },
    source: sources.tiara,
  },
  {
    title: { zh: 'VLSI/CAD 研究社群', en: 'VLSI/CAD Research Community' },
    description: {
      zh: '清大資工系將 VLSI/CAD Laboratory 列為跨多位教授的研究群，核心聚焦 VLSI 設計與 CAD。',
      en: 'NTHU Computer Science lists VLSI/CAD as a broader faculty research community in chip design and CAD.',
    },
    source: sources.nthuLabs,
  },
] as const

export const recruiting = {
  title: { zh: '一起解真實世界的問題', en: 'Work on problems that matter' },
  introduction: {
    zh: '研究團隊長期連結教授、研究生與產業工程師，從真實產業問題出發，完成系統實作並投稿高品質國際會議與期刊。歡迎對 AI 晶片、VLSI/EDA、軟硬體協同設計與智慧系統有熱情的學生加入。',
    en: 'Students work with faculty and industry engineers on practical AI-chip, VLSI/EDA, hardware–software co-design, and intelligent-system problems, with opportunities to publish internationally.',
  },
  values: [
    { zh: '真實產業議題與大型合作團隊', en: 'Real industrial problems and large collaborative teams' },
    { zh: '演算法、模型、硬體與系統實作', en: 'Algorithms, models, hardware, and full-system implementation' },
    { zh: '國際投稿與海外發表經驗', en: 'International publication and presentation opportunities' },
    { zh: '鼓勵博士研究與跨領域發展', en: 'Support for doctoral and interdisciplinary growth' },
  ],
  source: {
    label: 'Student Recruiting',
    url: 'https://www.cs.nthu.edu.tw/~scchang/student_recruit.html',
  },
} as const

export const externalProfiles = [
  sources.professor,
  sources.scholars,
  {
    label: 'Professor publication archive',
    url: 'https://www.cs.nthu.edu.tw/~scchang/publication.html',
  },
  {
    label: 'Google Scholar',
    url: 'https://scholar.google.com/citations?hl=en&user=LXaFMMAAAAAJ',
  },
] as const
