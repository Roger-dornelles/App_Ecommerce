import axiosClient from '../axios/config';
import {ReturnTypes} from '../types/ReturnApi';

export default {
  states: async (): Promise<ReturnTypes | undefined> => {
    try {
      const response = await axiosClient({
        url: '/states/all',
        method: 'GET',
      });

      if (response.data.error) {
        return {
          error: true,
          message: response.data.message,
          data: null,
        };
      }

      if (!response.data.error) {
        return {
          error: false,
          message: null,
          data: response.data.data,
        };
      }
    } catch (error) {
      return {
        error: true,
        message: 'Ocorreu um erro, tente mais tarde.',
        data: null,
      };
    }
  },
};
