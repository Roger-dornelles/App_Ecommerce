import styled from 'styled-components/native';

export const AreaCards = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const AreaCard = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
`;

interface ContainerCardProps {
  color?: string;
}
export const ContainerCard = styled.TouchableOpacity<ContainerCardProps>`
  width: 40%;
  margin: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({color}) => color};
  border-radius: 4px;
`;

export const ImageCard = styled.Image`
  width: 50px;
  height: 60px;
`;
