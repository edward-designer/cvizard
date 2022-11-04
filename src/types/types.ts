export interface IJob {
  id: string;
  date: string;
  jobTitle: string;
  employer: string;
  url: string;
  scoreCV?: number;
  scoreCover?: number;
  description?: string;
}
