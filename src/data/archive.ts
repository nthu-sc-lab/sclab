import { sources, type SourceReference } from './siteContent'

export interface Announcement {
  readonly date: string
  readonly title: string
  readonly category: 'news' | 'award' | 'project' | 'community'
  readonly source: SourceReference
}

const announcementSource = {
  label: 'Announcement archive',
  url: 'https://sites.google.com/site/nthuvlsisclab/announcement',
} as const

export const announcements: readonly Announcement[] = [
  { date: '2011-11-23', title: 'First Announcement', category: 'news', source: announcementSource },
  { date: '2011-11-24', title: '100 年度專題說明會', category: 'project', source: announcementSource },
  { date: '2011-11-25', title: '網頁更新：博士班、碩士班、合作教授資料', category: 'news', source: announcementSource },
  { date: '2011-11-26', title: 'Website release', category: 'news', source: announcementSource },
  { date: '2011-12-02', title: 'Students 頁面完成', category: 'news', source: announcementSource },
  { date: '2011-12-06', title: '大學部專題注意事項', category: 'project', source: announcementSource },
  { date: '2011-12-08', title: '大學部專題注意事項（二）', category: 'project', source: announcementSource },
  { date: '2011-12-14', title: '100 學年度專題生資料更新', category: 'project', source: announcementSource },
  { date: '2011-12-20', title: '明釗的婚禮來了~~', category: 'community', source: announcementSource },
  { date: '2012-03-29', title: '清華大學校慶系友活動', category: 'community', source: announcementSource },
  { date: '2012-05-19', title: '實驗室團隊榮獲 2012 ISPD Contest 第三名', category: 'award', source: announcementSource },
  { date: '2012-10-13', title: '實驗室團隊榮獲 2012 清大資工專題競賽優勝', category: 'award', source: announcementSource },
  { date: '2012-10-26', title: '實驗室專題生入選 CAD 競賽 TOP 5', category: 'award', source: announcementSource },
  { date: '2012-11-06', title: '2013 專題說明會', category: 'project', source: announcementSource },
  { date: '2012-12-12', title: '實驗室專題生榮獲 2012 CAD 競賽國內組特優', category: 'award', source: announcementSource },
  { date: '2013-12-06', title: '2014 專題生說明會', category: 'project', source: announcementSource },
  { date: '2014-11-04', title: '實驗室專題生榮獲 2014 CAD 競賽國內組優等', category: 'award', source: announcementSource },
  { date: '2014-12-02', title: '實驗室專題生入選 2014 清大資工專題展決賽', category: 'award', source: announcementSource },
  { date: '2014-12-12', title: '實驗室專題生榮獲 2014 清大資工專題競賽特優', category: 'award', source: announcementSource },
  { date: '2015-11-20', title: '2015 國際積體電路電腦輔助設計軟體製作競賽第二名', category: 'award', source: announcementSource },
  { date: '2016-03-14', title: '張世杰老師榮獲 104 年度科技部傑出研究獎', category: 'award', source: announcementSource },
  { date: '2016-12-19', title: '2016 國際積體電路電腦輔助設計軟體製作競賽優勝', category: 'award', source: announcementSource },
]

export type AwardScope = 'faculty' | 'supervised'

export interface AwardRecord {
  readonly year: string
  readonly title: string
  readonly detail: string
  readonly scope: AwardScope
  readonly source: SourceReference
}

export const featuredHonor = {
  year: '2025',
  title: '第 32 屆東元獎',
  detail: '32nd TECO Award — Electrical / Information / Communication Technology',
  scope: 'faculty',
  source: sources.tecoAward,
  category: '電機／資訊／通訊科技',
  description: '表彰張世杰教授長期投入半導體晶片最佳化設計、AI 晶片研發與產學合作，對臺灣半導體研究能量及產業發展的貢獻。',
  image: `${import.meta.env.BASE_URL}teco-award-2025.jpg`,
  imageSource: sources.nthuTecoAward,
} as const satisfies AwardRecord & {
  readonly category: string
  readonly description: string
  readonly image: string
  readonly imageSource: SourceReference
}

export const honors: readonly AwardRecord[] = [
  featuredHonor,
  {
    year: '2025',
    title: '聯發科技前瞻研發中心（MARC）傑出研究獎',
    detail: 'Distinguished Research Award, MediaTek Advanced Research Center',
    scope: 'faculty',
    source: sources.nthuEecs,
  },
  {
    year: '2021',
    title: '經濟部國家產業創新獎：產業創新聯盟',
    detail: 'National Industrial Innovation Award — Industrial Innovation Alliance',
    scope: 'faculty',
    source: sources.itri,
  },
  {
    year: '2021',
    title: '經濟部技術處法人科專成果表揚優良計畫獎',
    detail: 'Outstanding institutional research program',
    scope: 'faculty',
    source: sources.itri,
  },
  {
    year: '2020',
    title: '經濟部技術處法人科專成果表揚優良計畫獎',
    detail: 'Outstanding institutional research program',
    scope: 'faculty',
    source: sources.itri,
  },
  {
    year: '2016',
    title: '104 年度科技部傑出研究獎',
    detail: 'MOST Outstanding Research Award',
    scope: 'faculty',
    source: sources.nthu2016ResearchAward,
  },
  {
    year: '2014',
    title: '台北國際發明暨技術交易展發明競賽金牌獎',
    detail: 'Gold Medal, Taipei International Invention Show',
    scope: 'faculty',
    source: sources.mostAwardProfile,
  },
  {
    year: '2013',
    title: '中國電機工程學會 102 年傑出電機工程教授獎',
    detail: 'Outstanding Electrical Engineering Professor Award',
    scope: 'faculty',
    source: sources.nthuNews,
  },
  {
    year: '2013',
    title: '清華大學電機資訊學院傑出學術研究出版獎勵',
    detail: 'Outstanding Academic Research Publication Award',
    scope: 'faculty',
    source: sources.professor,
  },
  {
    year: '2012',
    title: '清華大學電機資訊學院傑出學術研究出版獎勵',
    detail: 'Outstanding Academic Research Publication Award',
    scope: 'faculty',
    source: sources.professor,
  },
  {
    year: '2011',
    title: '清華大學電機資訊學院傑出學術研究出版獎勵',
    detail: 'Outstanding Academic Research Publication Award',
    scope: 'faculty',
    source: sources.professor,
  },
  {
    year: '2010',
    title: 'NSoC 學術整合型計畫績優計畫獎',
    detail: 'Outstanding NSoC integrated project',
    scope: 'faculty',
    source: sources.mostAwardProfile,
  },
  {
    year: '1999',
    title: '國立中正大學工學院傑出研究獎',
    detail: 'Outstanding Research Award, College of Engineering, CCU',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '1999',
    title: '國科會甲等研究獎',
    detail: 'Excellent Research Award, National Science Council (88 年度)',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '1998',
    title: '國科會甲等研究獎',
    detail: 'Excellent Research Award, National Science Council (87 年度)',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '1997',
    title: '國科會甲等研究獎',
    detail: 'Excellent Research Award, National Science Council (86 年度)',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '1996',
    title: '國科會甲等研究獎',
    detail: 'Excellent Research Award, National Science Council (85 年度)',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '2002',
    title: '沈文仁教授紀念獎',
    detail: 'For “Charge Sharing Alleviation and Detection for CMOS Domino Circuits”',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '1994',
    title: '31st IEEE/ACM Design Automation Conference Best Paper Award',
    detail: 'For “Layout Driven Logic Synthesis for FPGA”',
    scope: 'faculty',
    source: sources.researchActivity,
  },
  {
    year: '2016',
    title: '國際積體電路 CAD 軟體製作競賽優勝',
    detail: 'International CAD software contest — winner; advised by Professor Chang',
    scope: 'supervised',
    source: announcementSource,
  },
  {
    year: '2015',
    title: '國際積體電路 CAD 軟體製作競賽第二名',
    detail: 'International CAD software contest — second place; advised by Professor Chang',
    scope: 'supervised',
    source: announcementSource,
  },
  {
    year: '2014',
    title: 'CAD 軟體製作競賽優等',
    detail: 'International CAD software contest — excellence; advised by Professor Chang',
    scope: 'supervised',
    source: announcementSource,
  },
  {
    year: '2014',
    title: '清大資工專題競賽特優',
    detail: 'NTHU Computer Science senior project competition — special award',
    scope: 'supervised',
    source: announcementSource,
  },
  {
    year: '2012',
    title: 'ISPD Contest 第三名',
    detail: 'International Symposium on Physical Design — third place',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2012',
    title: 'ICCAD CAD Contest 國際組 Top 5',
    detail: 'International Conference on Computer-Aided Design — Top 5',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2012',
    title: 'ICCAD CAD Contest 國內組特優',
    detail: 'International Conference on Computer-Aided Design — domestic special award',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2012',
    title: '清大資工專題競賽優勝',
    detail: 'NTHU Computer Science senior project competition — winner',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2011',
    title: '清大資工專題競賽亞軍',
    detail: 'NTHU Computer Science senior project competition — second place',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2011',
    title: 'TAU Contest 第二名',
    detail: 'TAU contest — second place',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2011',
    title: 'CUDA 程式大賽佳作',
    detail: 'CUDA programming contest — honorable mention (two teams)',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2011',
    title: 'ICCAD CAD Contest 優等',
    detail: 'International Conference on Computer-Aided Design — excellence',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2005',
    title: 'ICCAD CAD Contest 佳作',
    detail: 'International Conference on Computer-Aided Design — honorable mention',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2004',
    title: 'ICCAD CAD Contest 佳作',
    detail: 'International Conference on Computer-Aided Design — honorable mention (three teams)',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2003',
    title: 'ICCAD CAD Contest 佳作',
    detail: 'International Conference on Computer-Aided Design — honorable mention',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2002',
    title: '沈文仁教授紀念獎',
    detail: 'Awarded to a paper co-authored with Professor Chang',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2002',
    title: 'ICCAD CAD Contest 佳作',
    detail: 'International Conference on Computer-Aided Design — honorable mention',
    scope: 'supervised',
    source: sources.professor,
  },
  {
    year: '2001',
    title: '大學校院 IC 設計競賽佳作',
    detail: 'Cell-based design competition — honorable mention',
    scope: 'supervised',
    source: sources.researchActivity,
  },
  {
    year: '2000',
    title: '大學校院 IC 設計競賽設計完整獎',
    detail: 'Cell-based design competition — complete design award',
    scope: 'supervised',
    source: sources.researchActivity,
  },
  {
    year: '2000',
    title: '大學校院 CAD 軟體製作競賽不定題組特優',
    detail: 'CAD software competition, open-topic division — special award',
    scope: 'supervised',
    source: sources.researchActivity,
  },
  {
    year: '2000',
    title: '大學校院 CAD 軟體製作競賽定題組佳作',
    detail: 'CAD software competition, fixed-topic division — honorable mention',
    scope: 'supervised',
    source: sources.researchActivity,
  },
  {
    year: '1999',
    title: '大學校院 CAD 軟體製作競賽定題組佳作',
    detail: 'CAD software competition, fixed-topic division — honorable mention',
    scope: 'supervised',
    source: sources.researchActivity,
  },
  {
    year: '1998',
    title: '大學校院 Silicon Intellectual Property 設計競賽特優',
    detail: 'Silicon Intellectual Property design competition — special award',
    scope: 'supervised',
    source: sources.researchActivity,
  },
] as const

export const seniorProjects = [
  {
    year: '2014',
    title: 'Test Scheduling for Core-based SoC',
    result: 'CAD Contest 優等／清大資工專題競賽特優',
    members: '李侑倫、王韻婷、陳君函、吳伯恩、楊雅琪、吳家承',
  },
  {
    year: '2012',
    title: 'Fuzzy Pattern Matching for Physical Verification',
    result: 'CAD Contest at ICCAD TOP 5／台灣 CAD Contest 特優',
    members: '黎晉丞、溫婉妤、許佑嘉',
  },
  {
    year: '2012',
    title: 'Finding the Minimal Logic Difference for Functional ECO',
    result: '清大資工專題競賽優等',
    members: '楊庭量、林雪如、曹靜、蔡昕霓',
  },
  {
    year: '2011',
    title: 'Formal Property Qualification',
    result: '清大資工專題競賽亞軍',
    members: '林冠樺、徐瑞祥、翁婉禎、陳意喬',
  },
] as const

export const legacyResearch = [
  'Parallel Programming',
  'Clock Optimization',
  '3D IC Reliability Enhancement',
  'System Design and Verification',
  'Ultra Low Power Optimization',
  'Thermal Analysis',
  'Stacking Integrated Circuit Stress',
] as const

export interface HistoricalPerson {
  readonly name: string
  readonly period: string
  readonly group: 'phd' | 'master' | 'alumni' | 'collaborator' | 'staff'
  readonly photo?: string
  readonly degree?: string
  readonly thesis?: string
  readonly status?: string
  readonly detail?: string
}

const alumniRecords: readonly Omit<HistoricalPerson, 'group'>[] = [
  { name: '陳杰暘', period: '2018–2020', degree: 'Master of Computer Science, NTHU', thesis: 'AirConcierge: Generating Task-Oriented Dialogue via Efficient Large-Scale Knowledge Retrieval', status: '慧榮科技 (Silicon Motion)' },
  { name: '王姵心', period: '2018–2020', degree: 'Master of Computer Science, NTHU', thesis: 'Contextual Temperature for Language Model', status: '益華電腦 (Cadence)' },
  { name: '周心平', period: '2018–2020', degree: 'Master of Information Systems and Applications, NTHU', thesis: 'Remix: Rebalanced Mixup', status: '新思科技 (Synopsys)' },
  { name: '陳浩雲', period: '2018–2020', degree: 'Master of Computer Science, NTHU', thesis: 'Learning with Hierarchical Complement Objective', status: '聯發科技 (MediaTek)' },
  { name: 'Praveen Kumar', period: '2017–2019', degree: 'Master of Information Systems and Applications, NTHU', thesis: 'Rethinking the Feature Learning for Personal Identification System using Gait', status: '美光 (Micron)' },
  { name: '劉峻豪', period: '2017–2019', degree: 'Master of Computer Science, NTHU', thesis: 'Sequence Learning Based on Hierarchical LSTM with Attention Module', status: '台灣積體電路 (TSMC)' },
  { name: '魏楚蒨', period: '2017–2019', degree: 'Master of Computer Science, NTHU', thesis: 'Person Identification by Walking Gesture Using Skeleton Sequences', status: '緯創 (Wistron)' },
  { name: '吳祥修', period: '2017–2019', degree: 'Master of Computer Science, NTHU', thesis: 'Accuracy Tolerance Neural Networks Under Aggressive Power Optimization', status: '新思科技 (Synopsys)' },
  { name: '梁肇宏', period: '2017–2019', degree: 'Master of Computer Science, NTHU', thesis: 'Improving Adversarial Robustness via Guided Complement Entropy', status: '益華電腦 (Cadence)' },
  { name: '曾璿安', period: '2016–2018', degree: 'Master of Computer Science, NTHU', thesis: 'Nested LSTM: Modeling Temporal Dynamics and Taxonomy in Location-Based Mobile Check-ins', status: '台灣積體電路 (TSMC)' },
  { name: '張書桓', period: '2016–2018', degree: 'Master of Computer Science, NTHU', thesis: 'A Reinforcement Learning Based Logic Synthesis Framework for Further Area Optimization', status: '台灣積體電路 (TSMC)' },
  { name: '許啟宏', period: '2016–2018', degree: 'Master of Computer Science, NTHU', thesis: 'MONAS: Multi-Objective Neural Architecture Search using Reinforcement Learning', status: '慧榮科技 (Silicon Motion)' },
  { name: '蔡佳陵', period: '2016–2018', degree: 'Master of Industrial Engineering and Management, NCHU', thesis: 'A LSTM-Based Algorithm for Estimating Plantar Pressure Dynamics Using Inertial Sensors', status: '群聯電子 (Phison)' },
  { name: '蘇育毅', period: '2016–2018', degree: 'Master of Computer Science, NTHU', thesis: 'Dynamic Early Terminating of Multiply-Accumulate Operation for Convolutional Neural Networks' },
  { name: 'Austin So', period: '2016–2018', thesis: 'A Hierarchical Approach for Efficient Workload Allocation in Deep Neural Network Enabled Edge Computing' },
  { name: '羅騏', period: '2015–2017', degree: 'Master of Computer Science, NTHU', thesis: 'A Dynamic Deep Neural Network Design for Efficient Workload Allocation in Edge Computing', status: '新思科技 (Synopsys)' },
  { name: '李侑倫', period: '2015–2017', degree: 'Master of Computer Science, NTHU', thesis: 'DC-Prophet: Predicting Catastrophic Machine Failures in DataCenters', status: '台灣積體電路 (TSMC)' },
  { name: '陳君函', period: '2015–2017', degree: 'Master of Computer Science, NTHU', thesis: 'Mining Structures of Convolutional Neural Networks: An Energy Perspective', status: '新思科技 (Synopsys)' },
  { name: '王韻婷', period: '2015–2017', degree: 'Master of Computer Science, NTHU', thesis: 'Aging-aware Chip Health Prediction Adopting an Innovative Monitoring Strategy', status: '台灣積體電路 (TSMC)' },
  { name: '卓思辰', period: '2014–2016', degree: 'Master of Computer Science, NTHU', thesis: 'An Efficient Snoop Filter with Adaptive Mechanism in Multiprocessor Systems', status: '台灣積體電路 (TSMC)' },
  { name: '張翠云', period: '2014–2016', degree: 'Master of Computer Science, NTHU', thesis: 'Sensor-Based Time Speculation Adapting to PVT Variations', status: '群暉科技 (Synology)' },
  { name: '許凱翔', period: '2014–2016', degree: 'Master of Computer Science, NTHU', thesis: 'Contactless Testing for Pre-Bond Interposers', status: '新思科技 (Synopsys)' },
  { name: '王志揚', period: '2014–2016', degree: 'Master of Computer Science, NTHU', thesis: 'Learning-Based Alleviation of Overoptimistic Voltage Scaling in Pre-Error AVS Systems', status: '台灣積體電路 (TSMC)' },
  { name: '蕭元超', period: '2014–2016', degree: 'Master of Computer Science, NTHU', thesis: 'Clock Skew Optimization for Voltage Variation', status: '聯發科技 (MediaTek)' },
  { name: '黎晉丞', period: '2013–2015', degree: 'Master of Computer Science, NTHU', thesis: 'An Efficient Architecture for Resolving the Aging Problem of Snoop Filter', status: '聯發科技 (MediaTek)' },
  { name: '曹靜', period: '2013–2015', degree: 'Master of Computer Science, NTHU', thesis: 'Cache Interference Free Architecture in Snoop Based Cache Coherence Protocol', status: '思科系統 (Cisco), Taipei' },
  { name: '林雪如', period: '2013–2015', degree: 'Master of Computer Science, NTHU', thesis: 'A Methodology for Alleviating Die Shift of Fan-Out Wafer-Level Packaging (FOWLP)', status: '台灣積體電路 (TSMC)' },
  { name: '溫婉妤', period: '2013–2015', degree: 'Master of Computer Science (Data Science), University of Southern California', thesis: 'Q-Learning Adaptive On-Line Dynamic Voltage Scaling for Designs with Graceful Degradation', status: 'Amazon, U.S.' },
  { name: '賴彥廷', period: '2012–2014', degree: 'Master of Computer Science, NTHU', thesis: 'Ping-Pong Mesh: An Efficient Clock Mesh Design', status: '台灣積體電路 (TSMC)' },
  { name: '徐瑞祥', period: '2012–2014', degree: 'Master of Computer Science, NTHU', thesis: 'Contactless Stacked-die Testing for Pre-bond Interposers', status: '台灣積體電路 (TSMC)' },
  { name: '賴冠宇', period: '2012–2014', degree: 'Master of Computer Science, NTHU', thesis: 'Yield and Timing Constrained Spare TSV Assignment for Three-Dimensional Integrated Circuits', status: '聯發科技 (MediaTek)' },
  { name: '陳意喬', period: '2012–2014', degree: 'Master of Computer Science, NTHU', thesis: 'High-Performance Deadlock-Free ID Assignment for Advanced Interconnect Architectures', status: 'Google, Taipei' },
  { name: '陳靜怡', period: '2011–2013', degree: 'Master of Computer Science, NTHU', thesis: 'A Novel Fuzzy Matching Model for Lithography Hotspot Detection', status: '慧榮科技 (Silicon Motion)' },
  { name: '林聖淵', period: '2011–2013', degree: 'Master of Computer Science, NTHU', thesis: 'A High Performance Parallel Algorithm for Approximate String Matching on Multi-core Processor', status: '聯發科技 (MediaTek)' },
  { name: '吳鴻昌', period: '2011–2013', degree: 'Master of Computer Science, NTHU', thesis: 'Coverage Assertion for Coverage Measurement in a Hardware-Accelerated Environment', status: '瑞昱半導體 (Realtek)' },
  { name: '俞浩', period: '2011–2013', degree: 'Ph.D. of Computer Science, University of California, Los Angeles', thesis: 'Package Aware Thermal Analysis and Reliable 3D IC Design', status: 'Amazon, U.S.' },
  { name: '鄭名延', period: '2010–2012', degree: 'Master of Computer Science, NTHU', thesis: '3D Variation-Aware Clock Tree Synthesis', status: '晨星半導體 (Mstar)' },
  { name: '沈君謙', period: '2010–2012', degree: 'Master of Computer Science, NTHU', thesis: 'Reusing Block-Level Test Patterns for Concurrency-Oriented Verification at System Level', status: '聯發科技 (MediaTek)' },
  { name: '蔡念豫', period: '2010–2012', degree: 'Master of Computer Science, NTHU', thesis: 'Stress and Crack Aware Design in 3D IC', status: '台灣積體電路 (TSMC)' },
  { name: '蔡坤庭', period: '2010–2011', degree: 'Master of Computer Science, NTHU', thesis: 'Synthesis of an Efficient Controlling Structure for Post-Silicon Skew Minimization', status: '聯發科技 (MediaTek)' },
  { name: '黃士修', period: '2009–2011', degree: 'Master of Computer Science, NTHU', thesis: 'Fault-Tolerant 3D Clock Network', status: '台灣雅虎 (Yahoo! Taiwan)' },
  { name: '劉振雄', period: '2009–2011', degree: 'Master of Computer Science, NTHU', thesis: 'Optimization of Perfect Hashing for Memory-Efficient Pattern Matching Architectures on Graphic Processing Units', status: '慧榮科技 (Silicon Motion)' },
  { name: '蔡昇宇', period: '2008–2010', degree: 'Master of Computer Science, NTHU', thesis: 'Accelerating Regular Expression Matching Using Multi-threaded Algorithm on GPU', status: '晨星半導體 (Mstar)' },
  { name: '曾子毅', period: '2008–2010', degree: 'Master of Computer Science, NTHU', thesis: 'High Performance Soft-Error Tolerant Design', status: '晨星半導體 (Mstar)' },
  { name: '何宜倫', period: '2008–2010', degree: 'Master of Computer Science, NTHU', thesis: 'A Thermal-Driven Task Allocation for 3D MCP Throughput Optimization', status: '瑞昱半導體 (Realtek)' },
  { name: '林辰宇', period: '2007–2009', degree: 'Master of Computer Science, NTHU', thesis: 'An Efficient Phase Detector Positioning for Post-Silicon Clock Skew Minimization', status: '新思科技 (Synopsys)' },
  { name: '徐偉翔', period: '2007–2009', degree: 'Master of Computer Science, NTHU', thesis: 'Throughput Optimization for Thermally Constrained Multi-Core Processors', status: '安派科技 (Apache)' },
  { name: '楊承智', period: '2007–2009', degree: 'Master of Computer Science, NTHU', thesis: 'Adjustable Delay Buffers for Clock Skew Minimization in Multi-Voltage Mode Designs', status: '台灣積體電路 (TSMC)' },
  { name: '鄭又慈', period: '2007–2009', degree: 'Master of Computer Science, NTHU', thesis: 'An Efficient Wakeup Scheduling Considering Resource Constraint for Sensor-Based Power Gating Designs', status: '中華電信' },
  { name: '林群裕', period: '2007–2009', degree: 'Master of Computer Science, NTHU', thesis: 'High-Performance Pattern Matching Algorithm on GPU', status: '晨星半導體 (Mstar)' },
  { name: '陳志強', period: '2006–2008', degree: 'Master of Computer Science, NTHU', thesis: 'Design and Verification for Dual Issue VLIW Digital Signal Processor', status: '晨星半導體 (Mstar)' },
  { name: '翁士閎', period: '2006–2008', degree: 'Ph.D. of Computer Science, University of California, San Diego', thesis: 'A Novel Sequential Circuit Optimization with Clock Gating Logic', status: 'Facebook, U.S.' },
  { name: '蕭海騏', period: '2006–2008', degree: 'Master of Computer Science, NTHU', thesis: 'Clock Skew Optimization Using Linear Programming under Multi-Corner Multi-Mode Conditions', status: '聯發科技 (MediaTek)' },
  { name: '張雅婷', period: '2006–2007', degree: 'Master of Computer Science, NTHU', thesis: 'Engineering Change Using Spare Cells with Constant Insertion', status: '聯發科技 (MediaTek)' },
  { name: '戴鈺唐', period: '2005–2007', degree: 'Master of Computer Science, NTHU', thesis: 'Optimization of Pattern Matching Algorithm for Memory Based Architecture', status: '聯發科技 (MediaTek)' },
  { name: '翟靖宇', period: '2005–2007', degree: 'Master of Computer Science, NTHU', thesis: 'Design Automation of High Speed Domino Circuits', status: '台灣積體電路 (TSMC)' },
  { name: '阮大成', period: '2005–2007', degree: 'Ph.D. of Computer Science & M.S. of Machine Learning, Carnegie Mellon University', thesis: 'Fine-Grained Sleep Transistor Sizing Algorithm for Leakage Power Minimization', status: 'Google, U.S.' },
  { name: '陳昱廷', period: '2005–2007', degree: 'Ph.D. of Computer Science, University of California, Los Angeles', thesis: 'An Efficient Wake-up Schedule during Power Mode Transition Considering Spurious Glitches Phenomenon', status: 'Google, U.S.' },
  { name: '包洵瑋', period: '2005–2007', degree: 'Master of Computer Science, NTHU', thesis: 'Timing Analysis Considering Simultaneous IR drop and Crosstalk Noises', status: '聯發科技 (MediaTek)' },
  { name: '林敬倫', period: '2004–2006', degree: 'Master of Computer Science, NTHU', thesis: 'Engineering Change Using Spare Cells', status: '聯發科技 (MediaTek)' },
  { name: '王大中', period: '2004–2006', degree: 'Master of Computer Science, NTHU', thesis: 'An Efficient Mechanism for Performance Optimization of Variable-Latency Designs', status: '聯發科技 (MediaTek)' },
  { name: '張岳隆', period: '2004–2006', degree: 'Master of Computer Science, NTHU', thesis: 'Efficient Boolean Characteristic Function for Timed ATPG', status: '老張魯肉飯進口貿易出公司' },
  { name: '江長平', period: '2004–2006', degree: 'Master of Computer Science, NTHU', thesis: 'Hardware Design of Regular Expression Matching', status: '台灣積體電路 (TSMC)' },
  { name: '陳仕昕', period: '2004–2006', degree: 'Master of Computer Science, NTHU', thesis: 'Timing Driven Power Gating', status: '聯發科技 (MediaTek)' },
  { name: '許永靖', period: '2003–2005', degree: 'Master of Computer Science, NTHU', thesis: 'Constraint Hardware Model for Efficient Random Verification', status: '瑞昱半導體 (Realtek)' },
  { name: '簡龍昇', period: '2003–2005', degree: 'Master of Computer Science, NTHU', thesis: 'Prediction and Analysis of Voltage Drop Based on Transmission Line Theory', status: 'NVIDIA, U.S.' },
  { name: '林建丞', period: '2003–2005', degree: 'Master of Computer Science, NTHU', thesis: 'Lower Bound Estimation of Maximum Instantaneous Current for Sequential Circuits', status: '益華電腦 (Cadence)' },
  { name: '翁懿歆', period: '2003–2005', degree: 'Master of Electrical Engineering, University of Southern California', thesis: 'Efficient Calculation of Timed Probability Density Function', status: 'Intel, U.S.' },
  { name: '張柏賢', period: '2003–2005', degree: 'Ph.D. of Computer Science, University of California, Santa Barbara', thesis: 'Synthesis of a Novel Timing Error Detection Architecture', status: 'Oracle, U.S.' },
  { name: '簡鶴松', period: '2002–2004', degree: 'Master of Computer Science, NTHU', thesis: 'Automatic Cell Library Generator for Transistor Array Based Programmable Cell Array', status: '宏達電子 (HTC)' },
  { name: '吳凱強', period: '2002–2004', degree: 'Ph.D. of Electrical and Computer Engineering, Carnegie Mellon University', thesis: 'Delay Variation Tolerance for Domino Circuits', status: 'Associate Professor, National Chiao Tung University' },
  { name: '蔡志昇', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: '動態可程式化邏輯陣列之低功率設計', status: '安謀國際科技 (ARM Taiwan)' },
  { name: '陳錫錦', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: 'JPEG2000的實作與驗証', status: '力華 (POWER CHINESE LTD)' },
  { name: '黃盛智', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: '靜態分析最大瞬時電流估流', status: '聯發科技 (MediaTek)' },
  { name: '施建中', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: '智慧型亂數驗證向量產生器', status: '聯詠科技 (Novatek)' },
  { name: '黃永昌', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: '以節省光罩成本為目的之工程變動設計及設計自動化', status: '聯發科技 (MediaTek)' },
  { name: '古明鑫', period: '2001–2003', degree: 'Master of Computer Science, NTHU', thesis: '一層金屬光罩可程式細胞陣列之設計與設計自動化', status: '海思半導體 (Hisilicon)' },
  { name: '林建佑', period: '2000–2002', degree: 'Master of Computer Science, NTHU', thesis: 'JPEG2000之高效能區塊編碼架構設計', status: '凌陽科技 (Sunplus)' },
  { name: '劉振華', period: '2000–2002', degree: 'Master of Computer Science, NTHU', thesis: 'H.26L 全域搜尋區塊比對移動估計器之設計', status: '聯發科技 (MediaTek)' },
  { name: '許家齊', period: '2000–2002', degree: 'Master of Computer Science, NTHU', thesis: '應用導線再排序將動態可程式化邏輯陣列之時序最佳化', status: '力華 (POWER CHINESE LTD)' },
  { name: '余明道', period: '2000–2002', degree: 'Master of Computer Science, NTHU', thesis: '應用相關時序差異的時鐘樹緩衡器尺吋設計', status: '凌陽科技 (Sunplus)' },
  { name: '林志忠', period: '2000–2002', degree: 'Master of Computer Science, NTHU', thesis: '進階微控制器晶片內建匯流排架構 (AMBA) 之實現' },
]

export const historicalPeople: readonly HistoricalPerson[] = [
  { name: '洪奕文 Yi-Wen Hung', period: '2017', group: 'phd', status: 'Full Time Student' },
  { name: '錢睿宏 Jui-Hung Chien', period: '2011–2017', group: 'phd', thesis: 'Stacking IC thermal-induced reliability issues', status: 'Industrial Technology Research Institute (ITRI)' },
  { name: '周仲韓 Chung-Han Chou', period: '2011–2016', group: 'phd', thesis: 'Clock Tree Design Under Ultra Low Voltage and Energy Recycling', status: '益華電腦 (Cadence)' },
  { name: '陳聿廣 Yu-Guang Chen', period: '2011–2016', group: 'phd', thesis: 'Live Free or Die Hard: Leveraging Design Cost and Reliability for Modern Design Techniques', status: 'Assistant Professor, National Central University' },
  { name: '周宣明 Hsuan-Ming Chou', period: '2010–2015', group: 'phd', thesis: 'Optimizations for Error-Tolerant Designs Considering Multi-Power Modes and Out-of-Order Transactions', status: 'MediaTek (MTK)' },
  { name: '龍巧玲 Chiao-Ling Lung', period: '2007–2012', group: 'phd', thesis: 'Reliability-aware 3D IC Designs', status: 'Industrial Technology Research Institute (ITRI)' },
  { name: '李明釗 Ming-Chao Lee', period: '2006–2012', group: 'phd', thesis: 'Design Optimization for Power Gating', status: 'Synopsys, Taiwan' },
  { name: '高聿謙 Yu-Chien Kao', period: '2006–2013', group: 'phd', thesis: 'Analysis and Optimization for the Post-Silicon Skew Tuning Architecture', status: 'Global Unichip' },
  { name: '仇德軒 De-Shiuan Chiou', period: '2005–2009', group: 'phd', thesis: 'Performance and Power Optimization for Power Gating Designs', status: 'Synopsys, Taiwan' },
  { name: '郭育旻 Yu-Min Kuo', period: '2004–2009', group: 'phd', thesis: 'Efficient Timing Criticality Analysis and Functional Flexibility Exploration for Clock Gating and ECO Designs', status: 'MediaTek (MTK)' },
  { name: '蘇祐世 Yu-Shih Su', period: '2003–2009', group: 'phd', thesis: 'Variability and Reliability Aware Performance & Timing Optimization of VLSI Designs', status: 'MediaTek (MTK)' },
  { name: '林政宏 Cheng-Hung Lin', period: '2002–2008', group: 'phd', thesis: 'Efficient Algorithm and Architecture Design for Regular Expression Matching', status: 'Associate Professor, National Taiwan Normal University' },
  { name: '謝政道 Cheng-Tao Hsieh', period: '2002–2007', group: 'phd', thesis: 'Switching Activity Based Reliability Analysis and Optimization for VLSI Designs', status: 'Skymizer, Taiwan' },

  ...['謝昇祐', 'Steven Wang', '魏子軒', '李宗翰', '陳昶志', '蔡立篁', '劉志容', '林啟陽', '鍾超壹', '曾令宇', '張祐禎'].map((name) => ({ name, period: '2020', group: 'master' as const })),

  ...alumniRecords.map((member) => ({ ...member, group: 'alumni' as const })),

  ...[
    ['Tien-Fu Chen', 'Historical cooperator'], ['Wen-Ben Jone', 'Historical cooperator'],
    ['Cheng-Hung Lin', 'Historical cooperator'], ['Chun-Yao Wang', 'Historical cooperator'],
    ['Yiyu Shi', 'Historical cooperator'], ['Yung-Chih Chen', 'Historical cooperator'],
  ].map(([name]) => ({ name, period: 'Current', group: 'collaborator' as const, detail: 'Research collaborator' })),
  { name: '周惠珍 Jane Chou', period: 'Current', group: 'staff', detail: 'Laboratory staff' },
]

export const peopleSource = {
  label: 'Member archive',
  url: 'https://sites.google.com/site/nthuvlsisclab/members/students',
} as const
