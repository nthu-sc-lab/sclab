import { sources, type SourceReference } from './siteContent'

export interface Announcement {
  readonly date: string
  readonly title: string
  readonly category: 'news' | 'award' | 'project' | 'community'
  readonly source: SourceReference
}

const announcementSource = {
  label: '舊站公告索引',
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

export const honors = [
  { year: '2021', title: '經濟部國家產業創新獎－產業創新聯盟', detail: 'Industrial Innovation Alliance', source: sources.itri },
  { year: '2020–2021', title: '經濟部技術處法人科專成果表揚優良計畫獎', detail: 'Outstanding institutional research program', source: sources.itri },
  { year: '2016', title: '104 年度科技部傑出研究獎', detail: 'MOST Outstanding Research Award', source: announcementSource },
  { year: '2015', title: '國際積體電路 CAD 軟體製作競賽第二名', detail: 'International CAD software contest — second place', source: announcementSource },
  { year: '2014', title: 'CAD Contest 優等與清大資工專題競賽特優', detail: 'Test Scheduling for Core-based SoC', source: announcementSource },
  { year: '2013', title: '中國電機工程師學會傑出電機工程教授獎', detail: 'Distinguished Electrical Engineering Professor Award', source: sources.itri },
  { year: '2012', title: 'ISPD Contest 第三名、ICCAD CAD Contest TOP 5／特優', detail: 'Student teams advised by the laboratory', source: sources.scholars },
  { year: '2011', title: 'NSoC 學術整合型計畫績優計畫獎', detail: 'NSC integrated project recognition', source: sources.scholars },
  { year: '1994', title: '31st IEEE/ACM DAC Best Paper Award', detail: 'Layout Driven Logic Synthesis for FPGA', source: sources.scholars },
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
  readonly detail?: string
}

export const historicalPeople: readonly HistoricalPerson[] = [
  { name: '洪奕文 Yi-Wen Hung', period: '2017–舊站最後更新', group: 'phd', detail: '舊站標示 Full Time Student；現況未驗證' },
  { name: '錢睿宏 Jui-Hung Chien', period: '2011–2017', group: 'phd', detail: 'Stacking IC thermal-induced reliability' },
  { name: '周仲韓 Chung-Han Chou', period: '2011–2016', group: 'phd', detail: 'Clock Tree Design Under Ultra Low Voltage and Energy Recycling' },
  { name: '陳聿廣 Yu-Guang Chen', period: '2011–2016', group: 'phd', detail: 'Reliability for modern design techniques' },
  { name: '周宣明 Hsuan-Ming Chou', period: '2010–2015', group: 'phd', detail: 'Error-tolerant designs and multi-power modes' },
  { name: '龍巧玲 Chiao-Ling Lung', period: '2007–2012', group: 'phd', detail: 'Reliability-aware 3D IC designs' },
  { name: '李明釗 Ming-Chao Lee', period: '2006–2012', group: 'phd', detail: 'Design Optimization for Power Gating' },
  { name: '高聿謙 Yu-Chien Kao', period: '2006–2013', group: 'phd', detail: 'Post-silicon skew tuning architecture' },
  { name: '仇德軒 De-Shiuan Chiou', period: '2005–2009', group: 'phd', detail: 'Power-gating performance and power optimization' },
  { name: '郭育旻 Yu-Min Kuo', period: '2004–2009', group: 'phd', detail: 'Clock gating and ECO design optimization' },
  { name: '蘇祐世 Yu-Shih Su', period: '2003–2009', group: 'phd', detail: 'Variation and reliability-aware VLSI optimization' },
  { name: '林政宏 Cheng-Hung Lin', period: '2002–2008', group: 'phd', detail: 'Regular expression matching algorithms and architecture' },
  { name: '謝政道 Cheng-Tao Hsieh', period: '2002–2007', group: 'phd', detail: 'Switching activity-based reliability analysis' },

  ...['謝昇祐', 'Steven Wang', '魏子軒', '李宗翰', '陳昶志', '蔡立篁', '劉志容', '林啟陽', '鍾超壹', '曾令宇', '張祐禎'].map((name) => ({ name, period: '舊站最後名單（約 2020）', group: 'master' as const, detail: '現況未驗證，僅作歷史保存' })),

  ...[
    ['陳杰暘', '2018–2020'], ['王姵心', '2018–2020'], ['周心平', '2018–2020'], ['陳浩雲', '2018–2020'],
    ['Praveen Kumar', '2017–2019'], ['劉峻豪', '2017–2019'], ['魏楚蒨', '2017–2019'], ['吳祥修', '2017–2019'], ['梁肇宏', '2017–2019'],
    ['曾璿安', '2016–2018'], ['張書桓', '2016–2018'], ['許啟宏', '2016–2018'], ['蔡佳陵', '2016–2018'], ['蘇育毅', '2016–2018'], ['Austin So', '2016–2018'],
    ['羅騏', '2015–2017'], ['李侑倫', '2015–2017'], ['陳君函', '2015–2017'], ['王韻婷', '2015–2017'],
    ['卓思辰', '2014–2016'], ['張翠云', '2014–2016'], ['許凱翔', '2014–2016'], ['王志揚', '2014–2016'], ['蕭元超', '2014–2016'],
    ['黎晉丞', '2013–2015'], ['曹靜', '2013–2015'], ['林雪如', '2013–2015'], ['溫婉妤', '2013–2015'],
    ['賴彥廷', '2012–2014'], ['徐瑞祥', '2012–2014'], ['賴冠宇', '2012–2014'], ['陳意喬', '2012–2014'],
    ['陳靜怡', '2011–2013'], ['林聖淵', '2011–2013'], ['吳鴻昌', '2011–2013'], ['俞浩', '2011–2013'],
    ['鄭名延', '2010–2012'], ['沈君謙', '2010–2012'], ['蔡念豫', '2010–2012'], ['蔡坤庭', '2010–2011'],
    ['黃士修', '2009–2011'], ['劉振雄', '2009–2011'], ['蔡昇宇', '2008–2010'], ['曾子毅', '2008–2010'], ['何宜倫', '2008–2010'],
    ['林辰宇', '2007–2009'], ['徐偉翔', '2007–2009'], ['楊承智', '2007–2009'], ['鄭又慈', '2007–2009'], ['林群裕', '2007–2009'],
    ['陳志強', '2006–2008'], ['翁士閎', '2006–2008'], ['蕭海騏', '2006–2008'], ['張雅婷', '2006–2007'],
    ['戴鈺唐', '2005–2007'], ['翟靖宇', '2005–2007'], ['阮大成', '2005–2007'], ['陳昱廷', '2005–2007'], ['包洵瑋', '2005–2007'],
    ['林敬倫', '2004–2006'], ['王大中', '2004–2006'], ['張岳隆', '2004–2006'], ['江長平', '2004–2006'], ['陳仕昕', '2004–2006'],
    ['許永靖', '2003–2005'], ['簡龍昇', '2003–2005'], ['林建丞', '2003–2005'], ['翁懿歆', '2003–2005'], ['張柏賢', '2003–2005'],
    ['簡鶴松', '2002–2004'], ['吳凱強', '2002–2004'], ['蔡志昇', '2001–2003'], ['陳錫錦', '2001–2003'], ['黃盛智', '2001–2003'], ['施建中', '2001–2003'], ['黃永昌', '2001–2003'], ['古明鑫', '2001–2003'],
    ['林建佑', '2000–2002'], ['劉振華', '2000–2002'], ['許家齊', '2000–2002'], ['余明道', '2000–2002'], ['林志忠', '2000–2002'],
  ].map(([name, period]) => ({ name, period, group: 'alumni' as const })),

  ...[
    ['Tien-Fu Chen', 'Historical cooperator'], ['Wen-Ben Jone', 'Historical cooperator'],
    ['Cheng-Hung Lin', 'Historical cooperator'], ['Chun-Yao Wang', 'Historical cooperator'],
    ['Yiyu Shi', 'Historical cooperator'], ['Yung-Chih Chen', 'Historical cooperator'],
  ].map(([name, period]) => ({ name, period, group: 'collaborator' as const, detail: '舊站合作人員；職稱與機構未作現況宣稱' })),
  { name: '周惠珍 Jane Chou', period: '舊站資料', group: 'staff', detail: '歷史實驗室助理紀錄；不刊登舊電話與個人聯絡資料' },
]

export const peopleSource = {
  label: '舊站 Students / Members',
  url: 'https://sites.google.com/site/nthuvlsisclab/members/students',
} as const
