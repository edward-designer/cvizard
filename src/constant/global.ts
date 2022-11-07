import path from 'path';

export const postsDirectory = path.join(process.cwd(), 'src/cv');
export const appSteps = [
  { text: 'Job Details', href: '/job/[id]/job' },
  { text: 'CV', href: '/job/[id]/cv' },
  { text: 'Cover Letter', href: '/job/[id]/coverLetter' },
  { text: 'Download', href: '/job/[id]/preview' },
];
