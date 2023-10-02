import axiosClient from '../axios/config';
import {ReturnTypes} from '../types/ReturnApi';

export default {
  infoUser: async (id: number): Promise<ReturnTypes | undefined> => {
    try {
      if (!id) {
        return {
          error: true,
          message: 'Usuário invalido',
          data: null,
        };
      }

      const response = await axiosClient({
        url: `/user/info/${id}`,
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
        message: 'Ocorreu um erro, tente mais tarde',
        data: null,
      };
    }
  },
};
