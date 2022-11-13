import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { formatMDwithMeta } from '@/lib/fileHandling';
import { getKeywordStat } from '@/lib/helper';
import { readFromJobMD } from '@/lib/reader';

import { archiveDirectory, postsDirectory } from '@/constant/global';

export default async function save(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST': {
      const { id } = req.body;
      if (!id) res.status(500).send('No filename provided');
      const fileType = id.replaceAll(/[\d-]*/g, '');
      switch (fileType) {
        case 'job.md': {
          const fileContents = formatMDwithMeta(req.body);
          const filepath = path.join(postsDirectory, id);
          try {
            await fs.writeFile(filepath, fileContents, {
              encoding: 'utf8',
              flag: 'w',
            });
            res.status(200).send('success');
          } catch (err) {
            res.status(500).send(err);
          }
          break;
        }
        case 'cv.md':
        case 'coverLetter.md': {
          const { content } = req.body;
          const fileContents = content;
          const fileIdJob = id.replace(/cv|coverLetter/, 'job');
          const filepathJob = path.join(postsDirectory, fileIdJob);

          const jobData = await readFromJobMD(fileIdJob);

          const { score } = getKeywordStat(
            fileContents,
            jobData.description || ''
          );

          if (fileType === 'cv.md') {
            jobData.scoreCV = score;
          }
          if (fileType === 'coverLetter.md') {
            jobData.scoreCover = score;
          }
          const fileContentsJob = formatMDwithMeta(jobData);

          const filepath = path.join(postsDirectory, id);
          try {
            await fs.writeFile(filepath, fileContents, {
              encoding: 'utf8',
              flag: 'w',
            });
            await fs.writeFile(filepathJob, fileContentsJob, {
              encoding: 'utf8',
              flag: 'w',
            });
            res.status(200).send('success');
          } catch (err) {
            res.status(500).send(err);
          }
          break;
        }
      }
      break;
    }

    case 'PUT': {
      const { sourceId, destinationId } = req.body;
      if (!sourceId || !destinationId)
        res.status(500).send('No filename provided');
      const sourcePath = path.join(postsDirectory, sourceId);
      const destinationPath = path.join(postsDirectory, destinationId);
      try {
        await fs.copyFile(sourcePath, destinationPath);
        const cv = await fs.readFile(sourcePath, 'utf8');
        res.status(200).send(cv);
      } catch (err) {
        res.status(500).send(err);
      }
      break;
    }

    case 'DELETE': {
      const { id } = req.body;
      const files = [`${id}-job.md`, `${id}-cv.md`, `${id}-coverLetter.md`];
      try {
        files.forEach((file) =>
          fs.rename(
            path.join(postsDirectory, file),
            path.join(archiveDirectory, file)
          )
        );
        res.status(200).send('success');
      } catch (err) {
        res.status(500).send(err);
      }
      break;
    }
  }
}
