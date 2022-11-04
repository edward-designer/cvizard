import axios from 'axios';

import { IJob } from '@/types/types';

export const saveToFile = async (uploadData: IJob) => {
  return axios
    .post('/api/fileHandling', uploadData)
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
