import { PAPER_CATEGORIES, type PaperCategoryId } from './paperTaxonomy'
import { buildWordCloudTerms, paperCategoryCounts, papers } from '../lib/papers'

export interface LocalizedText {
  readonly zh: string
  readonly en: string
}

export interface SourceReference {
  readonly label: string
  readonly url: string
}

export interface ResearchArea {
  readonly id: PaperCategoryId
  readonly title: LocalizedText
  readonly summary: LocalizedText
  readonly topics: readonly LocalizedText[]
}

export const sources = {
  professor: {
    label: 'Professor profile',
    url: 'https://www.cs.nthu.edu.tw/~scchang/',
  },
  researchActivity: {
    label: 'Academic honors page',
    url: 'https://www.cs.nthu.edu.tw/~scchang/research_activity.html',
  },
  nthuNews: {
    label: 'NTHU bulletin',
    url: 'https://www.nthu.edu.tw/periodical/index/102',
  },
  nthu2016ResearchAward: {
    label: 'NTHU research award news',
    url: 'https://www.nthu.edu.tw/hotNews/content/34',
  },
  nthuEecs: {
    label: 'NTHU EECS bulletin',
    url: 'https://eecs.site.nthu.edu.tw/p/405-1005-291496,c148.php?Lang=zh-tw',
  },
  mostAwardProfile: {
    label: 'MOST award profile',
    url: 'https://02232568002016b.xlog.com.tw/images/files/11125.pdf',
  },
  itri: {
    label: '工業技術研究院經營團隊',
    url: 'https://www.itri.org.tw/ListStyle.aspx?DisplayStyle=01_content&MGID=1162141307626510443&MmmID=1036233406517556313&SiteID=1',
  },
  oldLab: {
    label: 'Laboratory archive',
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

const RESEARCH_AREA_SUMMARIES: Readonly<Record<PaperCategoryId, LocalizedText>> = {
  'ai-acceleration': {
    zh: '從模型壓縮、量化到推論架構，探索 AI 演算法與硬體加速的共同設計。',
    en: 'Co-designing AI algorithms and hardware through model compression, quantization, and efficient inference.',
  },
  'eda-power-integrity': {
    zh: '以設計自動化、時序分析與電源完整性方法，提升晶片系統的效能與可靠度。',
    en: 'Improving chip performance and reliability through design automation, timing analysis, and power integrity.',
  },
  'computer-vision': {
    zh: '以事件相機、深度估計、3D 建模與影像辨識研究高效率的視覺理解系統。',
    en: 'Efficient visual understanding with event cameras, depth estimation, 3D modeling, and image recognition.',
  },
  'speech-audio': {
    zh: '研究關鍵字偵測、語音活動分析與語音增強，發展可部署的低功耗音訊 AI。',
    en: 'Deployable, low-power audio AI for keyword spotting, voice activity analysis, and speech enhancement.',
  },
}

function getResearchTopics(categoryId: PaperCategoryId): readonly LocalizedText[] {
  return buildWordCloudTerms(papers, { categoryId })
    .slice(0, 5)
    .map((term) => ({ zh: term.text, en: term.text }))
}

export const researchAreas: readonly ResearchArea[] = PAPER_CATEGORIES.map((category) => ({
  id: category.id,
  title: { zh: category.label, en: category.englishLabel },
  summary: {
    zh: `${RESEARCH_AREA_SUMMARIES[category.id].zh}（CSV 收錄 ${paperCategoryCounts[category.id]} 筆研究紀錄）`,
    en: `${RESEARCH_AREA_SUMMARIES[category.id].en} ${paperCategoryCounts[category.id]} catalogue records are indexed here.`,
  },
  topics: getResearchTopics(category.id),
}))

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

export const professorPhoto = {
  local: `${import.meta.env.BASE_URL}professor.jpg`,
  member: `${import.meta.env.BASE_URL}professor-2.jpg`,
  fallback: 'https://cosr.site.nthu.edu.tw/var/file/536/1536/img/858960265.png',
} as const

export const campusPhotos = [
  {
    src: `${import.meta.env.BASE_URL}nthu-campus.jpg`,
    alt: '國立清華大學校園與大草坪',
    label: 'NTHU CAMPUS',
    title: '國立清華大學校園',
    source: 'https://www.nthu.edu.tw/hotNews/content/513',
  },
  {
    src: `${import.meta.env.BASE_URL}nthu-entrance.jpg`,
    alt: '國立清華大學校園入口',
    label: 'CAMPUS ENTRANCE',
    title: '清華校園入口',
    source: 'https://www.nthu.edu.tw/hotNews/content/1024',
  },
] as const

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
    source: sources.professor,
  },
  {
    period: '2012–2015',
    title: '清華大學資訊工程學系系主任',
    english: 'Chair, Department of Computer Science, NTHU',
    source: sources.professor,
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
      zh: '教授個人研究資料記錄研究成果、研究興趣與學術任職資訊。',
      en: 'The professor profile records research interests, publications, and academic appointments.',
    },
    source: sources.professor,
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
