import { fallbackExperience, readRows } from './_data';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const experience = await readRows(
      'SELECT id, title, organization, period, description, type FROM experience ORDER BY id',
      fallbackExperience,
    );

    return res.status(200).json(experience);
  } catch {
    return res.status(200).json(fallbackExperience);
  }
}
