import styled from 'styled-components/native';
import themes from '../../../themes/themes';

export const Container = styled.View`
  width: 100%;
  margin-top: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerInput = styled.View`
  width: 87%;
`;

export const Error = styled.View`
  position: absolute;
  top: 0;
  color: ${themes.theme.red_200};
`;
