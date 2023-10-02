/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// import {Text, TextInput} from 'react-native';

import {Container, Text, TextInput} from './styled';
import {InputModeOptions} from 'react-native';
interface TextProps {
  text: string;
  margintop?: string;
  value: string | undefined;
  onChangeText: (value: string) => void;
  inputMode?: InputModeOptions | undefined;
  maxLength?: number;
  isError?: boolean;
  messageError?: string;
  width?: string;
}

const Input = ({
  text,
  margintop,
  value,
  onChangeText,
  inputMode,
  maxLength,
  isError,
  messageError,
  width,
  ...props
}: TextProps) => {
  return (
    <Container>
      <Text>{text}</Text>
      <TextInput
        {...props}
        marginTop={margintop}
        value={value}
        onChangeText={onChangeText}
        inputMode={inputMode}
        maxLength={maxLength}
        error={isError}
        width={width}
      />
      {isError && (
        <Text style={{position: 'absolute', bottom: -10, color: 'red'}}>
          {messageError}
        </Text>
      )}
    </Container>
  );
};

export default Input;
