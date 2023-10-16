import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {setTokenAction} from '../../store/reducers/signinReducer';
import {useNavigation} from '@react-navigation/native';
import {setModalAction} from '../../store/reducers/modalReducer';
import {RootState} from '../../store';

import apiUser from '../../api/user';
import {InfoUser} from '../../types/InfoUser';
import {Container, ContainerUserInfo, TouchableOpacity} from './styles';
import Text from '../../components/Text';
import themes from '../../themes/themes';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector((state: RootState) => state.useReducer);

  const [infoUser, setUserInfo] = useState<InfoUser>();

  useEffect(() => {
    const handleInfoUser = async () => {
      try {
        if (user.id) {
          const result = await apiUser.infoUser(user.id);

          if (result?.error) {
            dispatch(
              setModalAction({
                open: true,
                message: result.message,
                type: 'error',
              }),
            );
          }

          if (result?.error) {
            console.log('error');
          }

          if (!result?.error) {
            setUserInfo(result?.data as unknown as InfoUser);
          }
        }
      } catch (error) {
        dispatch(
          setModalAction({
            open: true,
            message: 'Ocorreu um erro, tente mais tarde.',
            type: 'error',
          }),
        );
      }
    };

    handleInfoUser();
  }, [dispatch, user.id]);

  const handleLogout = () => {
    dispatch(
      setTokenAction({
        token: {
          token: undefined,
        },
      }),
    );

    navigation.navigate('Produtos', {});
  };

  const handlePurchaseUser = () => {
    console.log('clicou');
  };

  return (
    <Container>
      {infoUser && (
        <ContainerUserInfo>
          <Text text={infoUser.name} />
          <Text text={infoUser.email} />
          <Text text={infoUser.contact} />
          <Text text={infoUser.state} />
          <Text text={infoUser.logradouro} />
          <Text text={infoUser.district} />
          <TouchableOpacity BgColor={themes.theme.green}>
            <Text text="Editar" textAlign="center" color={themes.theme.white} />
          </TouchableOpacity>
        </ContainerUserInfo>
      )}

      <Text
        text="Compras"
        textAlign="left"
        marginTop={15}
        color={themes.theme.blue_100}
        onPress={handlePurchaseUser}
      />

      <TouchableOpacity onPress={handleLogout} width="30%">
        <Text text="Sair" textAlign="center" />
      </TouchableOpacity>
    </Container>
  );
};

export default ProfileScreen;
