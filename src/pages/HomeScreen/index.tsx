/* eslint-disable react/no-unstable-nested-components */
// import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import axiosClient from '../../axios/config';
import ProductList from '../../components/ProductList';
import {ProductType} from '../../types/ProductTypes';
import {useDispatch} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';

interface RenderListType {
  item: ProductType;
}

const HomeScreen = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsAll = async () => {
      try {
        const response = await axiosClient({
          url: '/products/all',
          method: 'GET',
        });

        if (response.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        dispatch(
          setModalAction({
            message:
              'Ocorreu um erro ao exibir os produtos, tente mais tarde...',
            open: true,
            type: 'error',
          }),
        );
      }
    };
    productsAll();
  }, [dispatch]);

  const RenderList = (item: RenderListType) => {
    const image = item.item.photosID.map(i => i.link);
    return <ProductList products={item} image={image} />;
  };

  // const handleProfile = () => {
  //   navigation.navigate('Profile', {});
  // };
  return (
    <View>
      <FlatList
        data={products}
        renderItem={(item: RenderListType) => RenderList(item)}
      />
    </View>
  );
};

export default HomeScreen;
