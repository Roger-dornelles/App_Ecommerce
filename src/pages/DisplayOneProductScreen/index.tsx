import React, {useEffect, useState} from 'react';
import {AreaProduct, Container} from './styles';

import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';
import apiDisplayOneProduct from '../../api/DisplayOneProduct';
import {ProductType} from '../../types/ProductTypes';

import {Dimensions, FlatList} from 'react-native';

import Slide from '../../components/Slide';

const DisplayOneProductScreen = () => {
  const {width, height} = Dimensions.get('window');
  const route = useRoute();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductType[] | undefined>([]);
  const [images, setImages] = useState();

  const {id}: any = route.params;

  useEffect(() => {
    const displayProduct = async () => {
      try {
        const result = await apiDisplayOneProduct.DisplayOneProduct(id);

        if (result?.error) {
          dispatch(
            setModalAction({
              message: result.message,
              open: true,
              type: 'error',
            }),
          );
        }

        if (!result?.error) {
          const products = [];
          products.push(result?.data);
          setImages(result?.data?.images.map(i => i));
          setProduct(products.map((i: any) => i.product));
        }
      } catch (error) {
        dispatch(
          setModalAction({
            message: 'Ocorreu um erro, tente mais tarde.',
            open: true,
            type: 'error',
          }),
        );
      }
    };
    displayProduct();
  }, [dispatch, id]);

  const renderProduct = () => {
    return <Slide product={product} images={images} />;
  };

  return (
    <Container style={{width, height}}>
      <AreaProduct>
        <FlatList data={product} renderItem={renderProduct} />
      </AreaProduct>
    </Container>
  );
};

export default DisplayOneProductScreen;
