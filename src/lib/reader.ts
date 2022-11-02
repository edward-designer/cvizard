import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { IJob } from '@/types/types';

export const postsDirectory = path.join(process.cwd(), 'src/cv');

export const readMetaFromDir = () => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((filename) => /job/.test(filename));

  const jobs = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  }) as IJob[];
  return jobs;
};
