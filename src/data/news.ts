export interface NewsItem {
  date: string;
  content: (string | { text: string; url: string })[];
  upcoming?: boolean;
}

// Original wording and inline links, with grammar/consistency edits only.
// Months follow the homepage; see docs/content-sources.md for discrepancies.
export const news: NewsItem[] = [
  {
    date: '2026-11',
    content: ['Giving a talk at the Georgia Chapter of the American College of Cardiology.'],
    upcoming: true,
  },
  {
    date: '2026-10',
    content: ['I will be a panelist at the IROS 2026 Evolving Landscape of Surgical Robotics Workshop.'],
    upcoming: true,
  },
  {
    date: '2026-06',
    content: [
      'Our paper ',
      { text: 'Ego-Pi', url: 'https://egopipaper.github.io/' },
      ' is released! We explore how we can teach robots new tasks using human data.',
    ],
  },
  {
    date: '2026-06',
    content: [
      'Giving another talk at ',
      { text: 'Samsung Medical Center', url: 'https://www.samsunghospital.com/en/' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2026-05',
    content: ['Giving a talk at the Yale AI in Surgical Care Symposium.'],
  },
  {
    date: '2026-04',
    content: ['Giving a guest lecture in the Johns Hopkins University robot learning course!'],
  },
  {
    date: '2026-04',
    content: [
      'Giving a talk at the ',
      { text: 'UPenn GRASP', url: 'https://www.grasp.upenn.edu/' },
      ' seminar.',
    ],
  },
  {
    date: '2026-04',
    content: [
      'Giving a talk at the ',
      { text: 'Global Breast Cancer Conference (GBCC)', url: 'https://gbcc.kr/Main.asp' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2026-01',
    content: [
      'Giving a talk at ',
      { text: 'Samsung Medical Center', url: 'https://www.samsunghospital.com/en/' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2025-12',
    content: [
      'Giving a talk at the ',
      { text: 'SNU AI Computing School', url: 'https://computing-ai-school-2025.snu.ac.kr/' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2025-12',
    content: ['Giving a talk at NeurIPS GenAI4Health in San Diego, CA.'],
  },
  {
    date: '2025-11',
    content: [
      'Giving a talk at the ',
      { text: 'Clinical Robotic Surgical Association (CRSA)', url: 'https://cme.cityofhope.org/16CRSACongress#group-tabs-node-course-default1' },
      '.',
    ],
  },
  {
    date: '2025-09',
    content: [
      'Giving a talk at CoRL’s ',
      { text: 'Automating Robotic Surgery Workshop', url: 'https://automating-robotic-surgery-workshop.github.io/' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2025-09',
    content: ['Giving a talk at the China GI Surgical Forum.'],
  },
  {
    date: '2025-07',
    content: [
      'Our Science Robotics paper ',
      { text: 'SRT-H', url: 'https://h-surgical-robot-transformer.github.io/' },
      ' made the July cover and ranked 2nd in ',
      { text: 'Altmetric score', url: 'https://www.altmetric.com/details/179138031' },
      ' among all Science Robotics papers. More than 280 news articles have been written about the work!',
    ],
  },
  {
    date: '2025-04',
    content: [
      'Giving a talk at the ',
      { text: 'Korean Society of Endo-Laparoscopic & Robotic Surgery (KSERS)', url: 'http://www.ksels.com/2025/' },
      ' in Seoul, Korea.',
    ],
  },
  {
    date: '2024-12',
    content: [
      'Our ',
      { text: 'Surgical Robot Transformer (SRT)', url: 'https://surgical-robot-transformer.github.io/' },
      ' paper has been covered in the ',
      { text: 'Washington Post', url: 'https://www.washingtonpost.com/science/2024/12/22/robots-learn-surgical-tasks/' },
      ', among many other news outlets!',
    ],
  },
  {
    date: '2024-11',
    content: [
      'Giving an oral presentation at the ',
      { text: 'Conference on Robot Learning', url: 'https://2024.corl.org/' },
      ' on ',
      { text: 'Surgical Robot Transformer (SRT)', url: 'https://surgical-robot-transformer.github.io/' },
      ' in Munich, Germany.',
    ],
  },
];
