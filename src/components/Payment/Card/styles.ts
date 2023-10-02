import styled from 'styled-components/native';
import themes from '../../../themes/themes';

export const Container = styled.View`
  width: 100%;
  height: 100%;
`;

export const AreaCard = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AreaNumberAndComplement = styled.View`
  width: 95%;
  flex-direction: row;
  margin: 0 auto;
`;

export const Complement = styled.View`
  flex: 1;
`;

export const Number = styled.View`
  width: 25%;
`;

export const Error = styled.View`
  width: 100%;
  position: absolute;
  top: -35px;
  left: 0;
  z-index: 999;
  margin: 0 auto;
  background-color: ${themes.theme.red_200};
  padding: 5px;
`;

export const Success = styled.View`
  width: 100%;
  position: absolute;
  top: -35px;
  left: 0;
  z-index: 999;
  margin: 0 auto;
  background-color: ${themes.theme.green};
  padding: 5px;
`;

export const AreaModal = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: ${themes.theme.white};
`;

type ButtomTypes = {
  BgColor: string;
  isDisabled?: boolean;
};

export const Button = styled.TouchableOpacity<ButtomTypes>`
  width: 95%;
  padding: 8px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 4px;
  background-color: ${({isDisabled, BgColor}) =>
    isDisabled ? themes.theme.red_100 : BgColor};
`;
