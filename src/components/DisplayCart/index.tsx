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
import {useAuth} from '../../hooks/useAuth';
import {useCurrencyFormetted} from '../../hooks/useCurrencyFormatted';

interface DisplayCartTypes {
  cart: ProductCart[];
}

const DisplayCart = ({cart}: DisplayCartTypes) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {AuthRoute} = useAuth();

  const handleRemoveProductCart = (id: number) => {
    dispatch(setRemoverItemCartAction({id}));
  };

  const handleNavigation = (productID: number) => {
    navigation.navigate('Produto', {id: [productID]});
  };

  const currencyFormatted = useCurrencyFormetted();

  const handleConfirmPurchase = () => {
    AuthRoute('Endereço');
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
          <Button
            title="Finalizar Compra"
            BgColor={themes.theme.green}
            onPress={handleConfirmPurchase}
          />
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
