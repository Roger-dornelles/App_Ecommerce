/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AreaText} from './styles';

interface TextProps {
  text: string;
  fontSize?: number;
  color?: string;
}
const Text = ({text, fontSize, color}: TextProps) => {
  return (
    <AreaText
      style={{fontSize: fontSize ? fontSize : 15, color: color ? color : ''}}>
      {text}
    </AreaText>
  );
};
export default Text;
