import { fallbackProjects, readRows } from './_data';

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const projects = await readRows(
        'SELECT id, title, category, description, image_url, created_at FROM projects ORDER BY id',
        fallbackProjects,
      );
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      return res.status(501).json({
        error:
          'Project uploads are disabled on Vercel serverless with local SQLite. Use a hosted database and object storage for write support.',
      });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch {
    return res.status(200).json(fallbackProjects);
  }
}
