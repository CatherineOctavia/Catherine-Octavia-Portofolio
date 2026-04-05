import { fallbackSkills, readRows } from './_data';

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const skills = readRows(
    'SELECT id, name, percentage, icon FROM skills ORDER BY id',
    fallbackSkills,
  );

  return res.status(200).json(skills);
}
