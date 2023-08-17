import React from 'react';
// import {Text, TextInput} from 'react-native';

import {Container, Text, TextInput} from './styled';
interface TextProps {
  text: string;
  margintop?: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
}

const Input = ({text, margintop, value, onChangeText, ...props}: TextProps) => {
  return (
    <Container>
      <Text>{text}</Text>
      <TextInput
        {...props}
        marginTop={margintop}
        value={value}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Input;
