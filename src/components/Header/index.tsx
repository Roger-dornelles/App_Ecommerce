import React from 'react';
import {Container} from './styles';
import Image from '../Image';
import Text from '../Text';

const Header = () => {
  return (
    <Container>
      <Image image={'../../assets/images/logo.png'} width={20} height={20} />
      <Text text={'Logomarca'} />
    </Container>
  );
};
export default Header;
