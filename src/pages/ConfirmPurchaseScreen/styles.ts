import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 100%;
  background-color: ${themes.theme.gray_100};
  align-items: center;
  margin: 0 auto;
`;

export const Goback = styled.View`
  width: 100%;
  padding-left: 15px;
`;

export const GoBack = styled.TouchableOpacity`
  border: 0;
`;

export const AreaListProduct = styled.View`
  width: 100%;
  background-color: ${themes.theme.white};
  color: ${themes.theme.darkGray};
  font-size: 15px;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin-bottom: 18px;
`;

export const AreaContainerProduct = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${themes.theme.gray_100};
  margin-bottom: 10px;
  padding: 5px;
`;

export const Img = styled.Image`
  width: 70px;
  height: 50px;
  margin-right: 8px;
  border: 1px solid #c2c1c3;
`;
