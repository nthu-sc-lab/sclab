export interface ResearchPublication {
  readonly id: string;
  readonly year: number;
  readonly type: "Journal Article" | "Conference Paper";
  readonly title: string;
  readonly authors: string;
  readonly venue: string;
  readonly topic: string;
  readonly url: string;
  readonly doi?: string;
}

export const researchPublications: readonly ResearchPublication[] = [
  {
    id: "dynamic-ir-drop-prediction-2025",
    year: 2025,
    type: "Conference Paper",
    title:
      "Dynamic IR-Drop Prediction Through a Multi-Task U-Net with Package Effect Consideration",
    authors:
      "Yu-Hsuan Chen, Yu-Chen Cheng, Yong-Fong Chang, Yu-Che Lee, Jia-Wei Lin, Hsun-Wei Pao, Peng-Wen Chen, Po-Yu Chen, Hao-Yun Chen, Yung-Chih Chen, Chun-Yao Wang, and Shih-Chieh Chang",
    venue:
      "2025 Design, Automation & Test in Europe Conference (DATE), March 2025",
    topic: "Machine Learning for EDA",
    url: "https://doi.org/10.23919/DATE64628.2025.10992918",
    doi: "10.23919/DATE64628.2025.10992918",
  },
] as const;
