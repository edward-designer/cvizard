import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { postsDirectory } from '@/constant/global';

import { IJob } from '@/types/types';

export const readMetaFromDir = () => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((filename) => /job/.test(filename));

  const jobs = fileNames.map((fileName) => {
    const id = fileName.replace(/-job\.md$/, '');

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

export const readFromJobMD = (filename: string): IJob => {
  const file = path.join(postsDirectory, filename);
  try {
    const fileContents = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContents);
    return { ...data, description: content } as IJob;
  } catch {
    return {
      jobTitle: '',
      employer: '',
      date: '',
      url: '',
      description: '',
    } as IJob;
  }
};
