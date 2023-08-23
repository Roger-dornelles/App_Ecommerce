import themes from '../../themes/themes';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 10px;
  margin: 0 auto;
`;

export const AreaImageAndDescription = styled.View`
  margin: 0 auto;
  padding: 10px 0 50px 0;
`;

export const AreaDescription = styled.View`
  margin: 0 auto;
  padding: 12px 0;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  background-color: ${themes.theme.blue_100};
  color: ${themes.theme.gray_200};
  align-items: center;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px;
  margin-top: 12px;
  width: 300px;
`;

export const Texts = styled.Text`
  color: ${themes.theme.white};
  font-size: 16px;
  text-transform: uppercase;
`;
