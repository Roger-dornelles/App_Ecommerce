import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 98%;
  margin: 0 auto;
`;

export const ContainerUserInfo = styled.View`
  width: 90%;
  background-color: ${themes.theme.white};
  margin: 0 auto;
  margin-top: 12px;
  border-radius: 4px;
  padding: 10px 5px;
`;

type TouchableOpacityProps = {
  BgColor?: string;
  width?: string;
};
export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityProps>`
  width: ${({width}) => (width ? width : '100%')};
  padding: 4px;
  border-radius: 4px;

  margin-top: 15px;
  background-color: ${({BgColor}) =>
    BgColor ? BgColor : themes.theme.gray_200};
`;
