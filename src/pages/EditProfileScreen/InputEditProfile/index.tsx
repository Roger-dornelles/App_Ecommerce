/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {InputModeOptions, Text, TextInput} from 'react-native';
import {Container, ContainerInput, Error} from './styles';

import themes from '../../../themes/themes';

interface InputProps {
  text: string;
  value: string;
  onChangeText: (text: string) => void;
  inputMode: InputModeOptions;
  error?: boolean;
  messageError?: string;
  maxLength?: number;
}

const Index = ({
  text,
  value,
  inputMode,
  onChangeText,
  error,
  messageError,
  maxLength,
}: InputProps) => {
  return (
    <Container>
      <ContainerInput>
        <Text>{text}</Text>
        <TextInput
          value={value}
          inputMode={inputMode}
          onChangeText={onChangeText}
          style={{height: 38}}
          maxLength={maxLength}
        />
      </ContainerInput>

      {error && (
        <Error>
          <Text style={{color: `${themes.theme.red_300}`}}>
            {messageError ? messageError : 'Preencha o campo'}
          </Text>
        </Error>
      )}
    </Container>
  );
};

export default Index;
