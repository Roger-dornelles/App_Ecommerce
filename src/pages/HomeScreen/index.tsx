import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text, View} from 'react-native';
// import axiosClient from '../../axios/config';

const HomeScreen = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const productsAll = async () => {
  //     try {
  //       const response = await axiosClient({
  //         url: '/products/all',
  //         method: 'GET',
  //       });

  //       console.log('RESPONSE === ', response.data);
  //     } catch (error) {
  //       console.log('ERROR CATCH ', error);
  //     }
  //   };
  //   productsAll();
  // }, []);

  const handleProfile = () => {
    navigation.navigate('Profile', {});
  };
  return (
    <View>
      <Text>Ola Mundo</Text>
      <Button
        onPress={handleProfile}
        title="ir para profile"
        color={'#c3f2d5'}
      />
    </View>
  );
};

export default HomeScreen;
