import styled from 'styled-components/native';
import themes from '../../../themes/themes';

export const ContainerFlatList = styled.SafeAreaView`
  padding: 10px;
  margin: 10px auto;
  border-radius: 8px;
  background-color: ${themes.theme.white};
`;

// export const ContainerRenderList = styled.View`
//   width: 100%;
// `;

export const List = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  align-items: center;
`;

export const Img = styled.Image`
  width: 45px;
  height: 35px;
  margin-right: 5px;
`;
