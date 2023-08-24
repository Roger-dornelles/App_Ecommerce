/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import {ImageType, ProductType} from '../../types/ProductTypes';
import config from '../../../config';
import GoBack from '../GoBack';

import {
  AreaDescription,
  AreaImageAndDescription,
  Container,
  Texts,
  TouchableOpacity,
} from './styles';
import {useDispatch} from 'react-redux';

import {setCartAction} from '../../store/reducers/cartReducer';

interface SlideProps {
  product: ProductType[] | undefined;
  images: ImageType[] | undefined;
}
const Slide = ({product, images}: SlideProps) => {
  const {width, height} = Dimensions.get('window');

  const dispatch = useDispatch();

  const image = images?.map(i =>
    i.link.replace('http://localhost:5000', config.BASE_URL),
  );
  const handleImages = (img: string) => {
    return <Image image={img} height={250} width={330} />;
  };

  const handleConfirmPurchase = (product: ProductType[] | undefined) => {
    dispatch(setCartAction(product));
  };

  return (
    <Container style={{width, height}}>
      <GoBack />
      <AreaImageAndDescription>
        <FlatList
          data={image}
          renderItem={item => handleImages(item.item)}
          horizontal
        />

        {product &&
          product.map((i: any) => {
            return (
              <AreaDescription key={i.id}>
                <Text text={i.name} fontSize={18} paddingBottom={10} />
                <Text text={i.description} fontSize={18} paddingBottom={6} />
                <Text
                  text={`Valor ${i.value}`}
                  fontSize={18}
                  paddingBottom={6}
                />
                <Text
                  text={`Disponível: ${i.quantity}`}
                  fontSize={18}
                  paddingBottom={6}
                />
                <Text
                  text={`Negociável: ${i.isInstallments ? 'Sim' : 'Não'}`}
                  fontSize={18}
                />
              </AreaDescription>
            );
          })}
        <TouchableOpacity onPress={() => handleConfirmPurchase(product)}>
          <Texts>comprar</Texts>
        </TouchableOpacity>
      </AreaImageAndDescription>
    </Container>
  );
};

export default Slide;
