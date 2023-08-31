import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: ${themes.theme.white};
`;

export const AreaDescriptionProduct = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${themes.theme.gray_100};
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
`;

export const Pressable = styled.Pressable`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const AreaButtons = styled.View`
  width: 60%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

interface TouchableOpacityType {
  width?: string;
  BGColor?: string;
  flexdirection?: string;
  margintop?: string;
}
export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityType>`
  width: ${({width}) => (width ? width : '50px')};
  flex-direction: ${({flexdirection}) => flexdirection};
  justify-content: center;
  align-items: center;
  margin-top: ${({margintop}) => margintop};
  z-index: 99;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({BGColor}) =>
    BGColor ? BGColor : themes.theme.blue_50};
`;

export const Input = styled.TextInput`
  border: 0;
  outline: 0;
  width: 90px;
  font-size: 18px;
  text-align: center;
`;

export const AreaTotalProduct = styled.View`
  width: 100%;
  padding: 35px 0;
  justify-content: flex-end;
  align-items: center;
  color: ${themes.theme.darkGray};
`;

export const TotalPurchase = styled.View`
  width: 30%;
  flex-direction: row;
`;
