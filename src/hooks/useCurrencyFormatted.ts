import {useSelector} from 'react-redux';
import {RootState} from '../store';

export const useCurrencyFormetted = () => {
  const {cart} = useSelector((state: RootState) => state.cartReducer);
  if (cart) {
    let currencyFormatted = '';
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += Number(
        cart[i].valueProduct
          .substring(2, cart[i].valueProduct.length - 2)
          .replace(',', '')
          .replace('.', '') * cart[i].quantity,
      );

      currencyFormatted = total.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    return currencyFormatted;
  }
};
