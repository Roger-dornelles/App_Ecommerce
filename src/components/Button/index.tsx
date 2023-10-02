import React from 'react';
import {Buttons, Container} from './styled';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  BgColor?: string;
}

const Button = ({title, onPress, BgColor}: ButtonProps) => {
  return (
    <Container>
      <Buttons title={title} onPress={onPress} color={BgColor} />
    </Container>
  );
};
export default Button;
