export const profile = {
  name: 'Ji Woong Kim',
  fullName: 'Ji Woong (Brian) Kim',
  email: 'jwbkim@stanford.edu',
  scholar: 'https://scholar.google.com/citations?user=Z_lj4yMAAAAJ&hl=en',
  cv: `${import.meta.env.BASE_URL}cv.pdf`,
  original: 'https://sites.google.com/view/jkimrobot/home',
  personal: `${import.meta.env.BASE_URL}personal/`,
};

export interface ResearchProject {
  id: string;
  title: string;
  venue: string;
  description: string;
  authors: string;
  url: string;
  paper: string;
  caption: string;
  distinctions?: { text: string; url?: string; context?: string }[];
  cover?: { image: string; alt: string; caption: string; url: string };
}

export const projects: ResearchProject[] = [
  {
    id: 'ego-pi',
    title: 'Ego-Pi: VLA Fine-Tuning for Ego-Centric Human and Robot Data',
    venue: 'CVPR Findings · 2026',
    description: 'We show that we can teach robots new tasks, such as new sorting rules, skill composition, and rule-based ordering, via co-training with human data. This is useful because if you want to steer your robot to perform new tasks, you can simply collect human data rather than further robot data.',
    authors: 'Ji Woong Kim*, Ke Wang*, Zipeng Fu, Sirui Chen, Cong Zhao, Jeff Lai, Chelsea Finn',
    url: 'https://egopipaper.github.io/',
    paper: 'https://arxiv.org/abs/2606.08107',
    caption: 'Ego-Pi demonstration',
  },
  {
    id: 'srt-h',
    title: 'SRT-H: A Hierarchical Framework for Autonomous Surgery via Language Conditioned Imitation Learning',
    venue: 'Science Robotics · 2025',
    distinctions: [
      { text: 'July 2025 cover' },
      { text: '2nd highest Altmetric score among Science Robotics papers', url: 'https://www.altmetric.com/details/179138031', context: 'July 2025' },
    ],
    description: 'We explore language-conditioned hierarchical imitation learning for real surgery using animal tissues.',
    authors: 'Ji Woong Kim, Juo-Tung Chen, Pascal Hansen, Lucy Shi, et al.',
    url: 'https://h-surgical-robot-transformer.github.io/',
    paper: 'https://arxiv.org/abs/2505.10251',
    caption: 'SRT-H demonstration',
    cover: {
      image: 'science-robotics-cover.webp',
      alt: 'Science Robotics July 2025 journal cover featuring SRT-H',
      caption: 'Science Robotics · July 2025',
      url: 'https://www.science.org/toc/scirobotics/10/104',
    },
  },
  {
    id: 'srt',
    title: 'Surgical Robot Transformer: Imitation Learning for Surgical Tasks',
    venue: 'CoRL · 2024',
    distinctions: [{ text: 'Oral presentation · 4.5% acceptance rate' }],
    description: 'We explore whether surgical manipulation tasks can be learned on the da Vinci system via imitation learning. IL on da Vinci turns out to be non-trivial, due to forward kinematics errors that can reach +/- 5cm.',
    authors: 'Ji Woong Kim, Tony Z. Zhao, Samuel Schmidgall, Anton Deguet, Marin Kobilarov, Chelsea Finn, Axel Krieger',
    url: 'https://surgical-robot-transformer.github.io/',
    paper: 'https://arxiv.org/abs/2407.12998',
    caption: 'Surgical Robot Transformer demonstration',
  },
];
