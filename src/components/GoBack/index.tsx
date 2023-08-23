/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';
import themes from '../../themes/themes';
import {Container} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
const GoBack = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Icon
          name={'arrow-left'}
          size={22}
          color={themes.theme.blue_100}
          style={{paddingRight: 10}}
        />

        <Text text={'voltar'} color={themes.theme.blue_100} fontSize={18} />
      </TouchableOpacity>
    </Container>
  );
};

export default GoBack;
