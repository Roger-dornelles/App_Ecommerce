import styled from 'styled-components/native';
import themes from '../../themes/themes';

interface ContainerTypes {
  BgColor: string;
}
export const Container = styled.View<ContainerTypes>`
  width: 100%;
  padding: 12px;
  background-color: ${({BgColor}) => BgColor};
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: 2s ease;
`;

export const Text = styled.Text`
  text-align: center;
`;

export const Button = styled.Text`
  width: 80%;
  margin: 0 auto;
  padding: 5px;
  border-radius: 4px;
  margin-top: 12px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  background-color: ${themes.theme.blue_100};
`;
