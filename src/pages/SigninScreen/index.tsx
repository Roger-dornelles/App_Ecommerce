import {useNavigation} from '@react-navigation/native';
import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container} from './styled';

const Signing = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  return (
    <Container>
      <Input text={'Email'} margintop={4} />
      <Input text={'Senha'} margintop={4} />
      <Button title="Login" onPress={handleClick} />
    </Container>
  );
};

export default Signing;
