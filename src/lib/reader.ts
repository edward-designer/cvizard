import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { postsDirectory } from '@/constant/global';

import { ICV, IJob } from '@/types/types';

export const readMetaFromDir = async () => {
  let fileNames = await fs.readdir(postsDirectory);
  fileNames = fileNames.filter((filename) => /job/.test(filename));

  const jobs = fileNames.map(async (fileName) => {
    const id = fileName.replace(/-job\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  return Promise.all(jobs);
};

export const readFromJobMD = async (filename: string): Promise<IJob> => {
  const file = path.join(postsDirectory, filename);
  try {
    const fileContents = await fs.readFile(file, 'utf8');
    const { data, content } = matter(fileContents);
    return { ...data, description: content } as IJob;
  } catch {
    return {
      id: '',
      jobTitle: '',
      employer: '',
      date: '',
      url: '',
      description: '',
    };
  }
};

export const getFromServer = async (
  id: string,
  type: 'cv' | 'coverLetter' = 'cv'
): Promise<ICV> => {
  const file = path.join(postsDirectory, `${id}-${type}.md`);
  try {
    const fileContents = await fs.readFile(file, 'utf8');
    const { content } = matter(fileContents);
    return { id, content };
  } catch {
    return { id: '', content: '' };
  }
};
