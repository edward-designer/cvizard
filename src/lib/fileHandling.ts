import axios from 'axios';

import { ICV, IJob } from '@/types/types';

export const saveToFile = async (uploadData: IJob | ICV) => {
  return axios
    .post('/api/fileHandling', uploadData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const copyCVFromTemplate = async (
  sourceId: string,
  destinationId: string
) => {
  return axios
    .put('/api/fileHandling', { sourceId, destinationId })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const deleteFile = async (id: string) => {
  return axios
    .delete('/api/fileHandling', { data: { id } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.message;
    });
};

export const formatMDwithMeta = (data: IJob) => {
  const { date, jobTitle, employer, url, scoreCV, scoreCover, description } =
    data;

  const fileContentsJob = `---
date: '${date || ''}'
jobTitle: '${jobTitle || ''}'
employer: '${employer || ''}'
url: '${url || ''}'
scoreCV: ${scoreCV}
scoreCover: ${scoreCover}
---
${description || ''}`;

  return fileContentsJob;
};
