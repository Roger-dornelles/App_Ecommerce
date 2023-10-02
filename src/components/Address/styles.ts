import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 100%;
  padding: 12px;
  background-color: ${themes.theme.white};
  margin-top: 25px;
`;

export const ContainerUser = styled.View`
  width: 100%;
  background-color: ${themes.theme.gray_100};
  padding: 12px;
`;

interface TouchableProps {
  color?: string;
}
export const TouchableOpacity = styled.TouchableOpacity<TouchableProps>`
  width: 80%;
  background-color: ${({color}) => (color ? color : themes.theme.green)};
  margin: 0 auto;
  margin-top: 22px;
  padding: 5px;
  border-radius: 4px;
`;
