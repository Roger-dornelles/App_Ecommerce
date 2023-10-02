import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 100%;
  padding: 10px;
`;

export const ContainerModal = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background-color: ${themes.theme.white};
`;

export const Button = styled.Pressable`
  width: 100%;
  border: 1px solid ${themes.theme.gray_200};
  padding: 8px;
  border-radius: 4px;
`;

export const List = styled.Pressable`
  width: 100%;
`;

