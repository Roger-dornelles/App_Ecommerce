import styled from 'styled-components/native';
import themes from '../../../../themes/themes';

export const Container = styled.View`
  width: 95%;
  margin: 0 auto;
  background-color: ${themes.theme.white};
`;

export const Pressable = styled.Pressable`
  width: 100%;
  border: 1px solid #ccc;
  padding: 7px;
  border-radius: 4px;
`;

export const Touchable = styled.TouchableOpacity`
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
`;

export const DescriptionParcel = styled.Text`
  width: 90%;
  margin: 0 auto;
  font-size: 16px;
  padding: 5px;
`;
