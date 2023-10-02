import axiosClient from '../axios/config';
import {PurchaseTypes} from '../types/Purchase';
import {ReturnTypes} from '../types/ReturnApi';

export default {
  userPurchase: async (
    purchase: PurchaseTypes,
  ): Promise<ReturnTypes | undefined> => {
    try {
      if (!purchase.id) {
        return {
          error: true,
          message: 'Usuario invalido!!!',
          data: null,
        };
      }

      const response = await axiosClient({
        url: `/product/purchase/${purchase.id}`,
        method: 'POST',
        data: {
          userID: purchase.userID,
          numberParcelOfValue: purchase.numberOfParcelSelected,
          total: purchase.totalPurchase,
          numberOfCard: purchase.numberCad,
          securityCode: purchase.securityCode,
          cardName: purchase.cardName,
          userProductDataOfPurchase: purchase.userProductDataOfPurchase,
          deliveryAddress: purchase.deliveryAddress,
          name: purchase.name,
          phone: purchase.phone,
          address: purchase.address,
          complement: purchase.complement,
          dueDate: purchase.date,
          numberAddress: purchase.numberAddress,
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
