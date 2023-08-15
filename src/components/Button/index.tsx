import React from 'react';
import {Buttons, Container} from './styled';

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

const Button = ({title, onPress}: ButtonProps) => {
  return (
    <Container>
      <Buttons title={title} onPress={onPress} />
    </Container>
  );
};
export default Button;
