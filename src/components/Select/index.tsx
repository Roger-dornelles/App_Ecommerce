import React, {useEffect, useState} from 'react';
import Text from '../Text';
import {FlatList, Modal, View} from 'react-native';
import {StatesType} from '../../types/State';
import {Button, Container, ContainerModal, List} from './styles';
import themes from '../../themes/themes';

interface SelectProps {
  data: StatesType[];
  handleDisplayListState: (value: string) => void;
  text: string;
}

const Select = ({data, handleDisplayListState, text}: SelectProps) => {
  const [stateSelected, setStateSelected] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (stateSelected !== '') {
      setModalVisible(false);
    }

    stateSelected && handleDisplayListState(stateSelected);
  }, [handleDisplayListState, stateSelected]);

  const handleDisplayListStates = (item: StatesType) => {
    return (
      <List onPress={() => setStateSelected(item.name)}>
        <Text
          text={`${item.name}`}
          textAlign="center"
          paddingBottom={7}
          color={themes.theme.blue_100}
        />
      </List>
    );
  };

  return (
    <Container>
      <Button onPress={() => setModalVisible(true)}>
        <Text
          text={stateSelected ? stateSelected : text}
          color={themes.theme.black}
        />
      </Button>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View>
          <ContainerModal>
            <FlatList
              data={data}
              renderItem={(item: {item: StatesType}) =>
                handleDisplayListStates(item.item)
              }
            />
          </ContainerModal>
        </View>
      </Modal>
    </Container>
  );
};
export default Select;
