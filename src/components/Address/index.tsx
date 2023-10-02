import React from 'react';

import Text from '../Text';

import {InfoUser} from '../../types/InfoUser';
import {Container, TouchableOpacity, ContainerUser} from './styles';
import themes from '../../themes/themes';
import {NewAddressUser} from '../../pages/ConfirmPurchaseScreen';
import {useAuth} from '../../hooks/useAuth';
import {
  AreaContainerProduct,
  AreaListProduct,
  Img,
} from '../../pages/ConfirmPurchaseScreen/styles';
import {FlatList} from 'react-native';
import {useCurrencyFormetted} from '../../hooks/useCurrencyFormatted';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {setNewAddress} from '../../store/reducers/newAddress';

interface ModalProps {
  user: InfoUser;
  addressUser: NewAddressUser | undefined;
}

const Address = ({user, addressUser}: ModalProps) => {
  const {cart} = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();
  const {AuthRoute} = useAuth();
  const handleNewAddress = () => {
    AuthRoute('Novo Endereço');
  };

  const handleConfirmAddress = () => {
    dispatch(
      setNewAddress({
        address: user.logradouro.toLowerCase(),
        contact: user.contact.toLowerCase(),
        district: user.district.toLowerCase(),
        name: user.name.toLowerCase(),
        number: String(user.number).toLowerCase(),
        newState: user?.state as string,
      }),
    );

    AuthRoute('Pagamento');
  };

  const handleItems = (data: any) => {
    const images = data.image.map((i: string) => i);
    return (
      <AreaContainerProduct>
        <Img source={{uri: images[0]}} />
        <Text text={data.name} />
        <Text text={data.quantity} />
      </AreaContainerProduct>
    );
  };
  const valueTotalPurchase = useCurrencyFormetted();
  const isNewAddress = addressUser ? true : false;

  return (
    <Container>
      <>
        <AreaListProduct>
          <FlatList
            data={cart}
            renderItem={({item}: any) => handleItems(item)}
          />
          <Text
            text={`Total ${valueTotalPurchase}`}
            textAlign="right"
            color={themes.theme.blue_100}
          />
        </AreaListProduct>

        <Text
          text={'Endereço de Entrega'}
          color={themes.theme.blue_100}
          textAlign="center"
          paddingBottom={10}
          fontSize={18}
        />
        {isNewAddress ? (
          <>
            <ContainerUser>
              <Text text={`${addressUser?.name}`} />
              <Text text={`${addressUser?.contact}`} />
              <Text text={`${addressUser?.address}, ${addressUser?.number}`} />
              <Text text={`${addressUser?.district}`} />
              <Text text={`${addressUser?.newState}`} />
            </ContainerUser>
          </>
        ) : (
          <>
            <ContainerUser>
              <Text text={`${user?.name}`} />
              <Text text={`${user?.contact}`} />
              <Text text={`${user?.logradouro}, ${user?.number}`} />
              <Text text={`${user?.district}`} />
              <Text text={`${user?.state}`} />
            </ContainerUser>
          </>
        )}

        <TouchableOpacity onPress={handleNewAddress}>
          <Text
            text="Cadastrar novo endereço"
            textAlign="center"
            color={themes.theme.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleConfirmAddress}
          color={themes.theme.blue_100}>
          <Text
            text="Confirmar Endereço"
            textAlign="center"
            color={themes.theme.white}
          />
        </TouchableOpacity>
      </>
    </Container>
  );
};

export default Address;
