import styled from 'styled-components/native';
import themes from '../../themes/themes';
export const Container = styled.View`
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
`;

export const Error = styled.Text`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 0 auto;
  background-color: ${themes.theme.red_100};
  color: ${themes.theme.white};
  text-align: center;
  padding: 5px;
`;

interface TouchableOpacityType {
  BgColor?: string;
}
export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityType>`
  width: 90%;
  margin: 0 auto;
  padding: 6px;
  border-radius: 4px;
  margin-top: 12px;
  background-color: ${({BgColor}) => BgColor};
`;
