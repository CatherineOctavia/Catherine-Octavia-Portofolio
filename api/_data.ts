export const fallbackExperience = [
  {
    id: 1,
    title: 'Chinese language course',
    organization: '泗水中中华语学习中心',
    period: 'Present',
    description: 'Actively pursuing advanced Mandarin proficiency, currently HSK 3 certified.',
    type: 'Present',
  },
  {
    id: 2,
    title: 'Chinese Culinary Exploration',
    organization: 'High school project',
    period: 'School Project',
    description: 'Research and presentation about traditional Chinese culinary specialities.',
    type: 'School Project',
  },
  {
    id: 3,
    title: 'Chinese Calligraphy',
    organization: 'Extracurricular activity',
    period: 'Extracurricular',
    description: 'Practiced the ancient art of calligraphy from extracurricular activity.',
    type: 'Extracurricular',
  },
];

export const fallbackSkills = [
  { id: 1, name: 'Mandarin HSK 3', percentage: 85, icon: null },
  { id: 2, name: 'Public Speaking', percentage: 75, icon: null },
  { id: 3, name: 'Chinese Calligraphy', percentage: 25, icon: null },
  { id: 4, name: 'Cultural Research', percentage: 55, icon: null },
  { id: 5, name: 'Culinary presentation', percentage: 60, icon: null },
  { id: 6, name: 'Language Translation', percentage: 45, icon: null },
];

export const fallbackProjects = [
  {
    id: 1,
    title: 'Chinese Culinary Presentation',
    category: 'SCHOOL PROJECT',
    description: 'Traditional Chinese dishes and their original origin.',
    image_url: '',
  },
  {
    id: 2,
    title: 'Calligraphy Portfolio',
    category: 'ART',
    description: 'Collection of calligraphy works practiced during extracurricular sessions.',
    image_url: '',
  },
  {
    id: 3,
    title: 'Mandarin Learning Journey',
    category: 'EDUCATION',
    description: 'My progress from HSK 1 to HSK 3 at 泗水中中华语学习中心.',
    image_url: '',
  },
];

export async function readRows<T>(_query: string, fallbackRows: T[]): Promise<T[]> {
  return fallbackRows;
}
