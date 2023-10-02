/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {AreaText} from './styles';

interface TextProps {
  text: string;
  fontSize?: number;
  color?: string;
  paddingBottom?: number;
  textAlign?: 'center' | 'left' | 'right';
  marginRight?: number;
  marginTop?: number;
  onPress?: () => void;
}
const Text = ({
  text,
  fontSize,
  color,
  paddingBottom,
  textAlign,
  marginRight,
  marginTop,
  onPress,
}: TextProps) => {
  return (
    <AreaText
      onPress={onPress}
      style={{
        fontSize: fontSize ? fontSize : 15,
        color: color && color,
        paddingBottom: paddingBottom && paddingBottom,
        textAlign: textAlign && textAlign,
        marginRight: marginRight && marginRight,
        marginTop: marginTop && marginTop,
      }}>
      {text}
    </AreaText>
  );
};
export default Text;
