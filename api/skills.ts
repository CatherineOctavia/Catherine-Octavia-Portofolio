import { fallbackSkills, readRows } from './_data';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const skills = await readRows(
      'SELECT id, name, percentage, icon FROM skills ORDER BY id',
      fallbackSkills,
    );

    return res.status(200).json(skills);
  } catch {
    return res.status(200).json(fallbackSkills);
  }
}
