import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.ScrollView`
  width: 100%;
  margin: 0 auto;
`;

export const AreaAddress = styled.View`
  width: 97%;
  flex-direction: row;
  margin: 0 auto;
`;

export const Logradouro = styled.View`
  flex: 1;
  margin: 0 auto;
`;

export const NumberAddress = styled.View`
  width: 20%;
  margin: 0 auto;
`;

type ButtonType = {
  bgColor?: string;
};
export const Button = styled.TouchableOpacity<ButtonType>`
  width: 95%;
  margin: 0 auto;
  border-radius: 4px;
  margin-top: 12px;
  padding: 5px 0;
  background-color: ${({bgColor}) =>
    bgColor ? bgColor : themes.theme.blue_100};
`;
