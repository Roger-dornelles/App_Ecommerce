import axiosClient from '../axios/config';

export default {
  numberParcels: async (total: string) => {
    try {
      if (!total) {
        return {
          error: true,
          message: 'Valor Invalido',
          data: null,
        };
      }

      const response = await axiosClient({
        url: '/installment',
        method: 'POST',
        data: {valueTotal: total},
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
