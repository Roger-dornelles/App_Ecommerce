/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setTokenAction} from '../../store/reducers/signinReducer';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(
      setTokenAction({
        token: {
          token: undefined,
        },
      }),
    );

    navigation.navigate('Produtos', {});
  };

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#ccc',
          width: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
