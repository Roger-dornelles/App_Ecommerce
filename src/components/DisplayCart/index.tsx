import React from 'react';
import Text from '../Text';
import {ProductCart} from '../../types/Cart';
import Image from '../Image';
import {
  Container,
  AreaDescriptionProduct,
  TouchableOpacity,
  Pressable,
  AreaTotalProduct,
  TotalPurchase,
} from './styles';
import themes from '../../themes/themes';
import {useDispatch} from 'react-redux';
import {setRemoverItemCartAction} from '../../store/reducers/cartReducer';
import {useNavigation} from '@react-navigation/native';
import Button from '../Button';

interface DisplayCartTypes {
  cart: ProductCart[];
}

const DisplayCart = ({cart}: DisplayCartTypes) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveProductCart = (id: number) => {
    dispatch(setRemoverItemCartAction({id}));
  };

  const handleNavigation = (productID: number) => {
    navigation.navigate('Produto', {id: [productID]});
  };

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

  const handleConfirmPurchase = () => {
    console.log('clicou');
  };

  return (
    <Container>
      {cart &&
        cart.map(product => {
          return (
            <AreaDescriptionProduct key={product.id}>
              <Pressable onPress={() => handleNavigation(product.id)}>
                <Image image={product.image[0]} width={170} height={100} />
                <Text
                  text={product.name}
                  textAlign="center"
                  paddingBottom={10}
                />
                <Text
                  text={`${product.quantity} item${
                    product.quantity >= 2 ? 's' : ''
                  }`}
                  textAlign="center"
                  paddingBottom={10}
                />

                <Text text={`${product.valueProduct}`} textAlign="center" />
                <TouchableOpacity
                  width={'200px'}
                  BGColor={themes.theme.red_100}
                  flexdirection={'row'}
                  margintop={'15px'}
                  onPress={() => handleRemoveProductCart(product.id)}>
                  <Text
                    text={'Remover'}
                    color={themes.theme.white}
                    textAlign="center"
                  />
                </TouchableOpacity>
              </Pressable>
            </AreaDescriptionProduct>
          );
        })}

      {cart.length >= 1 && (
        <AreaTotalProduct>
          <TotalPurchase>
            <Text text="TOTAL:" textAlign="center" paddingBottom={15} />
            <Text
              text={currencyFormatted}
              textAlign="left"
              paddingBottom={15}
            />
          </TotalPurchase>
          <Button title="Comprar" onPress={handleConfirmPurchase} />
        </AreaTotalProduct>
      )}

      {!cart.length && (
        <>
          <AreaDescriptionProduct>
            <Text
              text="Opsss, Não há compras aqui"
              color={themes.theme.red_100}
              fontSize={20}
              textAlign="center"
            />
          </AreaDescriptionProduct>
        </>
      )}
    </Container>
  );
};
export default DisplayCart;
