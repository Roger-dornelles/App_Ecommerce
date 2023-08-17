import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 170px;
`;

export const ContainerRegister = styled.View`
  width: 90%;
  justify-content: center;
  flex-direction: row;
  margin-top: 20px;
`;

interface TextProps {
  colors?: string;
  underline?: boolean;
}
export const Text = styled.Text<TextProps>`
  font-size: 17px;
  color: ${({colors}) => (colors ? colors : themes.theme.darkGray)};
  text-decoration: ${({underline}) => (underline ? 'underline' : '')};
`;

export const Touchable = styled.TouchableOpacity`
  padding-left: 10px;
  color: ${themes.theme.blue_100};
`;

export const TouchableOpacity = styled.Text`
  width: 95%;
  margin: 0 auto;
  padding: 8px;
  border-radius: 4px;
  margin-top: 12px;
  text-align: center;
  text-transform: uppercase;
  background-color: ${themes.theme.blue_100};
`;
