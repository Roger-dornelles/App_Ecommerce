import React from 'react';
import Text from '../../components/Text';

import {useNavigation} from '@react-navigation/native';

import {Container, Goback, GoBack, AreaListProduct} from './styles';

import Payment from '../../components/Payment';

export interface NewAddressUser {
  address: string;
  contact: string;
  district: string;
  name: string;
  newState: string;
  number: string;
}

const Index = () => {
  const navigation = useNavigation();
  // const {AuthRoute} = useAuth();
  // const {cart} = useSelector((state: RootState) => state.cartReducer);

  // const valueTotalPurchase = useCurrencyFormetted();

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  return (
    <Container>
      <Goback>
        <GoBack onPress={handleGoBack}>
          <Text text="Voltar" />
        </GoBack>
      </Goback>

      <AreaListProduct>
        <Payment />
      </AreaListProduct>
    </Container>
  );
};
export default Index;
