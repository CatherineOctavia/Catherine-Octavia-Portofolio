import initSqlJs, { type Database, type SqlJsStatic } from 'sql.js';

export interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
}

export interface Skill {
  id: number;
  name: string;
  percentage: number;
  icon: string | null;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  created_at?: string;
}

const fallbackExperience: Experience[] = [
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

const fallbackSkills: Skill[] = [
  { id: 1, name: 'Mandarin HSK 3', percentage: 85, icon: null },
  { id: 2, name: 'Public Speaking', percentage: 75, icon: null },
  { id: 3, name: 'Chinese Calligraphy', percentage: 25, icon: null },
  { id: 4, name: 'Cultural Research', percentage: 55, icon: null },
  { id: 5, name: 'Culinary presentation', percentage: 60, icon: null },
  { id: 6, name: 'Language Translation', percentage: 45, icon: null },
];

const fallbackProjects: Project[] = [
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

let sqlEnginePromise: Promise<SqlJsStatic> | null = null;
let dbPromise: Promise<Database> | null = null;

function getSqlEngine(): Promise<SqlJsStatic> {
  if (!sqlEnginePromise) {
    sqlEnginePromise = initSqlJs({
      locateFile: (fileName) => {
        if (typeof window === 'undefined') {
          return `${process.cwd().replace(/\\/g, '/')}/public/${fileName}`;
        }
        return `/${fileName}`;
      },
    });
  }
  return sqlEnginePromise;
}

function mapRows<T>(db: Database, query: string): T[] {
  const results = db.exec(query);
  if (results.length === 0) {
    return [];
  }

  const first = results[0];
  return first.values.map((valueRow) => {
    const row: Record<string, unknown> = {};
    first.columns.forEach((columnName, index) => {
      row[columnName] = valueRow[index];
    });
    return row as T;
  });
}

async function getDatabase(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await getSqlEngine();
      const response = await fetch('/portfolio.db', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Unable to load SQLite database file.');
      }

      const bytes = new Uint8Array(await response.arrayBuffer());
      return new SQL.Database(bytes);
    })();
  }

  return dbPromise;
}

async function queryRows<T>(query: string): Promise<T[] | null> {
  try {
    const db = await getDatabase();
    return mapRows<T>(db, query);
  } catch {
    return null;
  }
}

export async function loadExperience(): Promise<Experience[]> {
  const rows = await queryRows<Experience>(
    'SELECT id, title, organization, period, description, type FROM experience ORDER BY id',
  );
  return rows && rows.length > 0 ? rows : fallbackExperience;
}

export async function loadSkills(): Promise<Skill[]> {
  const rows = await queryRows<Skill>('SELECT id, name, percentage, icon FROM skills ORDER BY id');
  return rows && rows.length > 0 ? rows : fallbackSkills;
}

export async function loadProjects(): Promise<Project[]> {
  const rows = await queryRows<Project>(
    'SELECT id, title, category, description, image_url, created_at FROM projects ORDER BY id',
  );
  return rows && rows.length > 0 ? rows : fallbackProjects;
}
