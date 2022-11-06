import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import {
  extractKeywordsFromString,
  getFilteredKeywordListFromString,
  getKeywordScore,
  getMatchedKeywordList,
} from '@/lib/helper';

import { postsDirectory } from '@/constant/global';

export const getScoreForNewJob = async (
  id: string,
  type: 'cv' | 'coverLetter' = 'cv'
) => {
  const keywordSourcePath = path.join(postsDirectory, `${id}-job.md`);
  const keywordSource = await fs.readFile(keywordSourcePath, 'utf8');
  const keywordList = getFilteredKeywordListFromString(
    matter(keywordSource).content
  );

  let fileNames = await fs.readdir(postsDirectory);
  const regex = new RegExp(type);
  fileNames = fileNames.filter((filename) => regex.test(filename));

  const jobs = fileNames.map(async (fileName) => {
    const fileRegex = new RegExp(`-${type}.md`);
    const fileId = fileName.replace(fileRegex, '');
    let matterResult;
    try {
      const fullPath = path.join(postsDirectory, `${fileId}-job.md`);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      matterResult = matter(fileContents);
    } catch (err) {
      return err;
    }
    const dataPath = path.join(postsDirectory, fileName);
    const data = await fs.readFile(dataPath, 'utf8');
    const matchedKeywords = getMatchedKeywordList(
      extractKeywordsFromString(data),
      keywordList
    );
    const scoreCV = getKeywordScore(matchedKeywords, keywordList);

    return {
      id: fileId,
      ...matterResult?.data,
      description: matterResult?.content || '',
      scoreCV,
    };
  });
  return Promise.all(jobs);
};
