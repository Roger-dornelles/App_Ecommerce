import React from 'react';
// import {Text, TextInput} from 'react-native';

import {Container, Text, TextInput} from './styled';
interface TextProps {
  text: string;
  margintop?: number;
}

const Input = ({text, margintop, ...props}: TextProps) => {
  return (
    <Container>
      <Text>{text}</Text>
      <TextInput {...props} marginTop={margintop} />
    </Container>
  );
};

export default Input;
