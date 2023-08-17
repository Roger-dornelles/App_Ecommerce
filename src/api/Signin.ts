import axiosClient from '../axios/config';
import {ReturnTypes} from '../types/ReturnApi';
import {SigininTypes} from '../types/signin';
import ValidateEmail from '../utils/validateEmail';
import ValidatePassword from '../utils/validatePassword';
export default {
  Signin: async ({
    email,
    password,
  }: SigininTypes): Promise<ReturnTypes | undefined> => {
    try {
      if (!email && password) {
        return {
          error: true,
          message: 'Preencha todos os campos!',
          data: null,
        };
      }

      if (email) {
        const isEmailValid = ValidateEmail(email);

        if (!isEmailValid) {
          return {
            error: true,
            message: 'Digite um email valido',
            data: null,
          };
        }
      }

      if (password) {
        const isPasswordValid = ValidatePassword(password);

        if (!isPasswordValid) {
          return {
            error: true,
            message:
              'A senha deve conter no minimo 9 caracteres e ser composta de letras,números e caracteres especiais',
            data: null,
          };
        }
      }

      const response = await axiosClient({
        url: '/login',
        method: 'POST',
        data: {
          email,
          password,
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
    } catch (error) {
      return {
        error: true,
        message: 'Ocorreu um error, tente mais tarde',
        data: null,
      };
    }
  },
};
