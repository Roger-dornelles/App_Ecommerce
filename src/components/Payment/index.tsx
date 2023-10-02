import React, {useState} from 'react';

import {AreaPayment, AreaPaymentSuccess} from './styles';
import themes from '../../themes/themes';

import Text from '../Text';
import CardsType from './CardsType';
import Card from './Card';
import {Modal} from 'react-native';
import {AreaModal} from './Card/styles';
import {useNavigation} from '@react-navigation/native';

const nameCards = [
  {
    id: 1,
    name: 'Master Card',
    image: require('../../assets/images/masterCard.png'),
  },
  {id: 2, name: 'Elo', image: require('../../assets/images/Elo.png')},
  {
    id: 3,
    name: 'American Express',
    image: require('../../assets/images/american-express.png'),
  },
  {id: 4, name: 'Visa', image: require('../../assets/images/Visa.png')},
];

const Index = () => {
  const {reset} = useNavigation();

  const [typeCard, setTypeCard] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  const [success, setSuccess] = useState<{open: boolean; message: string}>({
    open: false,
    message: '',
  });

  const handleNameCardSelected = (cardName: string) => {
    setTypeCard(cardName);
    if (cardName) {
      setModalVisible(true);
    }
  };

  const handleCloseModal = (value: boolean) => {
    setModalVisible(value);
  };

  const handleConfirmPaymentSuccess = (value: boolean) => {
    if (value) {
      setSuccess({
        message:
          'Seu pedido foi efetuado o PAGAMENTO, você pode acompanhar o pedido em seu PERFIL',
        open: true,
      });
    }
  };

  return (
    <>
      <AreaPayment>
        <Text
          text="Forma de Pagamento"
          textAlign="center"
          color={themes.theme.blue_100}
        />

        <CardsType
          handleNameCardSelected={handleNameCardSelected}
          nameCards={nameCards}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <AreaModal>
            {typeCard && (
              <Card
                cardName={typeCard}
                handleCloseModal={handleCloseModal}
                handleConfirmPaymentSuccess={handleConfirmPaymentSuccess}
              />
            )}
          </AreaModal>
        </Modal>
      </AreaPayment>

      {success.open && (
        <AreaPaymentSuccess>
          <Text
            text={success.message}
            color={themes.theme.white}
            textAlign="center"
          />

          <Text
            text="Voltar para Produtos"
            marginTop={30}
            color={themes.theme.black}
            onPress={() =>
              reset({
                index: 0,
                routes: [{name: 'Home'}],
              })
            }
          />
        </AreaPaymentSuccess>
      )}
    </>
  );
};

export default Index;
