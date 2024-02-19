import axiosClient from '../axios/config';

export default {
  userPurchase: async (id: number) => {
    try {
      if (!id) {
        return {
          error: true,
          message: 'Compras não encontradas',
          data: null,
        };
      }

      const response = await axiosClient({
        url: `/product/purchase/${id}`,
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
    } catch (err) {
      return {
        error: true,
        message: 'Ocorreu um erro, tente mais tarde.',
        data: null,
      };
    }
  },
};
