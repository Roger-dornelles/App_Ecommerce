import styled from 'styled-components/native';
import themes from '../../themes/themes';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${themes.theme.white};
`;

export const BackButton = styled.TouchableOpacity`
  width: 20%;
  margin: 15px 0 15px 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerButton = styled.View`
  width: 97%;
  margin: 0 auto;
  margin-top: 15px;
`;

export const Error = styled.View`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${themes.theme.red_100};
  z-index: 9999;
  padding: 5px 0;
`;

export const Success = styled.View`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${themes.theme.green_200};
  z-index: 9999;
  padding: 5px 0;
`;
