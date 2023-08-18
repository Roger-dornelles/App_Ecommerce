import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;

export const Area = styled.TouchableOpacity`
  border: 1px solid ${themes.theme.darkGray};
  padding: 12px;
  border-radius: 4px;

  margin: 12px 0;
  background-color: ${themes.theme.white};
`;

export const Image = styled.Image`
  width: 260px;
  height: 190px;
  margin-bottom: 8px;
  border-radius: 4px;
`;
