import React, {useEffect, useState} from 'react';
import Text from '../../../Text';
import {FlatList, Modal, View} from 'react-native';
import {Container, Pressable, DescriptionParcel, Touchable} from './styles';

interface ParcelsDescriptionType {
  parcel: string;
  value: string;
}

type RenderItem = {
  item: ParcelTypes;
};
type ParcelTypes = {
  data: ParcelsDescriptionType[] | undefined;
  text: string;
  handleNumberOfParcelSelected: (value: string) => void;
};

const Index = ({data, text, handleNumberOfParcelSelected}: ParcelTypes) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [parcelSelected, setParcelSelected] = useState<string>('');

  const handleRenderList = (item: ParcelsDescriptionType) => {
    return (
      <Touchable
        onPress={() => {
          setParcelSelected(`${item.parcel} X R$ ${item.value}`);
          setModalVisible(false);
        }}>
        <DescriptionParcel>
          {`${item.parcel} X R$ ${item.value}`}
        </DescriptionParcel>
      </Touchable>
    );
  };

  useEffect(() => {
    parcelSelected && handleNumberOfParcelSelected(parcelSelected);
  }, [handleNumberOfParcelSelected, parcelSelected]);
  return (
    <Container>
      <Text text={text} paddingBottom={10} />
      <Pressable onPress={() => setModalVisible(!modalVisible)}>
        <Text text={`${parcelSelected ? parcelSelected : 'Parcelas'}`} />
      </Pressable>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View>
            <FlatList
              data={data}
              renderItem={({item}: RenderItem) =>
                handleRenderList(item as unknown as ParcelsDescriptionType)
              }
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Index;
