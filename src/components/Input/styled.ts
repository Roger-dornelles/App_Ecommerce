import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 95%;
  margin: 0 auto;
  padding: 10px 0;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #646464;
  font-size: 16px;
`;

interface TextInputProp extends TextInputProps {
  marginTop?: string;
}
export const TextInput = styled.TextInput<TextInputProp>`
  width: 100%;
  height: 35px;
  border: 1px solid #c7c7c7;
  font-size: 18px;
  padding: 6px 0;
  padding-left: 6px;
  border-radius: 4px;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)};
`;
