/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AreaText} from './styles';

interface TextProps {
  text: string;
  fontSize?: number;
  color?: string;
  paddingBottom?: number;
  textAlign?: 'center' | 'left' | 'right';
}
const Text = ({text, fontSize, color, paddingBottom, textAlign}: TextProps) => {
  return (
    <AreaText
      style={{
        fontSize: fontSize ? fontSize : 15,
        color: color && color,
        paddingBottom: paddingBottom && paddingBottom,
        textAlign: textAlign && textAlign,
      }}>
      {text}
    </AreaText>
  );
};
export default Text;
