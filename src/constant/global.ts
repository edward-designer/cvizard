import path from 'path';

import { isLocal } from '@/constant/env';

export const postsDirectory = isLocal
  ? path.join(process.cwd(), 'src/cv')
  : '/tmp';
