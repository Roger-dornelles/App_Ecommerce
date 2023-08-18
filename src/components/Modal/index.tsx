import React, {useEffect, useState} from 'react';

import {Modal, View} from 'react-native';
import {Button, Container, Text} from './styles';
import themes from '../../themes/themes';
import {useDispatch} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';

interface ModalTypes {
  type: 'error' | 'success' | 'warning' | undefined;
  message: string | null | undefined;
  open: boolean;
}
const Modals = ({type, open, message}: ModalTypes) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setModalVisible(true);
    }
  }, [open]);

  let BgColors: string = '';
  if (type === 'error') {
    BgColors = themes.theme.red_100;
  }

  if (type === 'success') {
    BgColors = themes.theme.green_100;

    setTimeout(() => {
      setModalVisible(false);
    }, 2200);
  }

  if (type === 'warning') {
    BgColors = themes.theme.yellow_100;
  }

  const handleCloseModal = () => {
    setModalVisible(false);
    dispatch(
      setModalAction({
        type: 'error',
        message: '',
        open: false,
      }),
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Container BgColor={BgColors}>
          <Text>{message}</Text>
          <Button onPress={handleCloseModal}>Fechar</Button>
        </Container>
      </Modal>
    </View>
  );
};

// <Container BgColor={BgColors} open={open}>
//   <Text>{message}</Text>
// </Container>
export default Modals;
