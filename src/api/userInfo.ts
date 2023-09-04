import axiosClient from '../axios/config';

interface User {
  id: number;
  email: string;
  exp?: number;
  iat?: number;
}

interface ReturnApi {
  error: boolean;
  message: string | null;
  data: User | null | undefined;
}

export default {
  userInfo: async (token: string): Promise<ReturnApi | undefined> => {
    try {
      if (!token) {
        return {
          error: true,
          message: 'Token invalido',
          data: null,
        };
      }

      const response = await axiosClient({
        url: '/auth/app',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
