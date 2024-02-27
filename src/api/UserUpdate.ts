import axiosCliente from '../axios/config';
import {UserUpdateData} from '../types/UserUpdateData';

export default {
  userUpdated: async ({
    name,
    password,
    email,
    contact,
    logradouro,
    number,
    state,
    id,
    district,
  }: UserUpdateData) => {
    try {
      if (
        !name &&
        !password &&
        !email &&
        !contact &&
        !logradouro &&
        !number &&
        !state &&
        id &&
        district
      ) {
        return {
          error: true,
          message: 'Preencha todos os campos',
          data: null,
        };
      }

      const response = await axiosCliente({
        url: `/user/${id}`,
        method: 'PUT',
        data: {
          name,
          password,
          email,
          contact,
          logradouro,
          number,
          state,
          district,
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
          message: response.data.message,
          data: response.data.data,
        };
      }
    } catch (err) {
      return {
        error: true,
        message: 'Ocorreu um erro, tente mais tarde',
        data: null,
      };
    }
  },
};
