export interface IJob {
  id: string;
  date: string;
  jobTitle: string;
  employer: string;
  url: string;
  scoreCV?: number;
  scoreCover?: number;
  description?: string;
  init?: string;
  apply?: string;
  interview?: string;
  offer?: string;
  initNotes?: string;
  applyNotes?: string;
  interviewNotes?: string;
  offerNotes?: string;
}

export interface ICV {
  id: string;
  content: string;
}

export type TNames = 'init' | 'apply' | 'interview' | 'offer';
