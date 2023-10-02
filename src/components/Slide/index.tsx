/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
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
  Button,
  AreaButtons,
  Input,
} from './styles';
import {useDispatch, useSelector} from 'react-redux';

import {setCartAction} from '../../store/reducers/cartReducer';
import {RootState} from '../../store';

interface SlideProps {
  product: ProductType[] | undefined;
  images: ImageType[] | undefined;
}
const Slide = ({product, images}: SlideProps) => {
  const {width, height} = Dimensions.get('window');

  const [quantityPurchase, setQuantityPurchase] = useState<number>(1);

  const dispatch = useDispatch();
  const {cart} = useSelector((state: RootState) => state.cartReducer);

  const image = images?.map(i =>
    i.link.replace('http://localhost:5000', config.BASE_URL),
  );
  const handleImages = (img: string) => {
    return <Image image={img} height={250} width={330} />;
  };

  const handleConfirmPurchase = (product: ProductType) => {
    const products = {
      id: product.id,
      name: product.name,
      quantity: quantityPurchase,
      image: product.photosID.map(i =>
        i.link.replace('http://localhost:5000', config.BASE_URL),
      ),
      userId: product.userID,
      productAvailable: product.quantity,
      valueProduct: product.value.replace('R$ ', ''),
    };

    dispatch(setCartAction(products));
  };

  useEffect(() => {
    if (quantityPurchase <= 0) {
      setQuantityPurchase(0);
    }
  }, [quantityPurchase]);

  return (
    <Container style={{width, height}}>
      <GoBack />
      <AreaImageAndDescription>
        <FlatList
          data={image}
          renderItem={({item}) => handleImages(item)}
          horizontal
        />

        {product &&
          product.map((i: any) => {
            let disabledButtonAddProduct = false;
            cart.map(cart => {
              if (cart.id === i.id) {
                disabledButtonAddProduct =
                  cart.quantity + quantityPurchase <= cart.productAvailable
                    ? false
                    : true;
              }
            });

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

                <AreaButtons>
                  <Button
                    onPress={() => setQuantityPurchase(quantityPurchase + 1)}
                    disabled={
                      disabledButtonAddProduct ||
                      quantityPurchase === i.quantity
                    }>
                    <Text fontSize={20} text="+" />
                  </Button>

                  <Input>
                    <Text text={`${quantityPurchase}`} />
                  </Input>
                  <Button
                    onPress={() => setQuantityPurchase(quantityPurchase - 1)}
                    disabled={quantityPurchase === 0}>
                    <Text fontSize={20} text="-" />
                  </Button>
                </AreaButtons>

                <TouchableOpacity
                  onPress={() => handleConfirmPurchase(i)}
                  disabled={disabledButtonAddProduct}>
                  <Texts>comprar</Texts>
                </TouchableOpacity>
              </AreaDescription>
            );
          })}
      </AreaImageAndDescription>
    </Container>
  );
};

export default Slide;
