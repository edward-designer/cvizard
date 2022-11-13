import path from 'path';

import { TNames } from '@/types/types';

export const postsDirectory = path.join(process.cwd(), 'src/cv');

export const archiveDirectory = path.join(process.cwd(), 'src/cv/archive');

export const appSteps = [
  { text: 'Job Details', href: '/job/[id]/job' },
  { text: 'CV', href: '/job/[id]/cv' },
  { text: 'Cover Letter', href: '/job/[id]/coverLetter' },
  { text: 'Download', href: '/job/[id]/preview' },
];

export const trackerSteps: { text: TNames }[] = [
  { text: 'init' },
  { text: 'apply' },
  { text: 'interview' },
  { text: 'offer' },
];
