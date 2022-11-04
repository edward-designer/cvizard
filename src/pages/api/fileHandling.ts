import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { postsDirectory } from '@/constant/global';

export default function save(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { id, jobTitle, employer, date, url, description } = req.body;
      if (!id) res.status(500).send('No filename provided');

      const fileContents = `---
date: '${date}'
jobTitle: '${jobTitle}'
employer: '${employer}'
url: '${url}'
scoreCV: 0
scoreCover: 0
---
${description}`;

      const filepath = path.join(postsDirectory, id);
      try {
        fs.writeFileSync(filepath, fileContents, {
          encoding: 'utf8',
          flag: 'w',
        });
        res.status(200).send('success');
      } catch (err) {
        res.status(500).send(err);
      }
      break;
    }
    case 'DELETE': {
      const { id } = req.body;
      const filepath = path.join(postsDirectory, `${id}-job.md`);
      try {
        fs.unlinkSync(filepath);
        res.status(200).send('success');
      } catch (err) {
        res.status(500).send(err);
      }
      break;
    }
  }
}
