import axiosClient from '../axios/config';
import {RegisterNewUser} from '../types/RegistreNewUser';

export default {
  register: async (register: RegisterNewUser) => {
    try {
      if (
        !register.name ||
        !register.email ||
        !register.contact ||
        !register.cpf ||
        !register.district ||
        !register.logradouro ||
        !register.numberAddress ||
        !register.stateSelected ||
        !register.password
      ) {
        return {
          error: true,
          message: 'Preencha todos os campos',
          data: null,
        };
      }

      const response = await axiosClient({
        url: '/create/user',
        method: 'POST',
        data: {
          name: register.name,
          email: register.email,
          cpf: register.cpf.replaceAll('.', '').replace('-', ''),
          logradouro: register.logradouro,
          number: register.numberAddress,
          contact: register.contact.replace('(', '').replace(')', ''),
          state: register.stateSelected,
          password: register.password,
          district: register.district,
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
        message: 'Ocorreu um erro, tente mais tarde.',
        data: null,
      };
    }
  },
};
