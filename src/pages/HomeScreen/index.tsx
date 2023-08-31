/* eslint-disable react/no-unstable-nested-components */
// import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import axiosClient from '../../axios/config';
import ProductList from '../../components/ProductList';
import {ProductType} from '../../types/ProductTypes';
import {useRoute} from '@react-navigation/native';

interface RenderListType {
  item: ProductType;
}

const HomeScreen = () => {
  // const navigation = useNavigation();

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
        console.log('ERROR CATCH ', error);
      }
    };
    productsAll();
  }, []);

  const RenderList = (item: RenderListType) => {
    const image = item.item.photosID.map(i => i.link);
    return <ProductList products={item} image={image} />;
  };

  // const handleProfile = () => {
  //   navigation.navigate('Profile', {});
  // };
  return (
    <View>
      <FlatList data={products} renderItem={item => RenderList(item)} />
    </View>
  );
};

export default HomeScreen;
