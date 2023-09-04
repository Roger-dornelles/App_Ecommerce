import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {Container, Logo, Text, Touchable, ContainerRegister} from './styled';
import themes from '../../themes/themes';

import {setModalAction} from '../../store/reducers/modalReducer';
import ValidateEmail from '../../utils/validateEmail';
import ValidatePassword from '../../utils/validatePassword';

import Signin from '../../api/Signin';
import apiUser from '../../api/userInfo';
import {setTokenAction} from '../../store/reducers/signinReducer';
import {useDispatch} from 'react-redux';
import {setUserAction} from '../../store/reducers/userReducer';

const Signing = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      if (!email && !password) {
        dispatch(
          setModalAction({
            type: 'error',
            message: 'Preencha todos os campos',
            open: true,
          }),
        );
        return;
      }

      if (email) {
        const isEmailvalid = ValidateEmail(email);

        if (!isEmailvalid) {
          dispatch(
            setModalAction({
              type: 'error',
              message: 'E-mail invalido',
              open: true,
            }),
          );
          return;
        }
      }

      if (password) {
        const isPasswordValid = ValidatePassword(password);

        if (!isPasswordValid) {
          dispatch(
            setModalAction({
              type: 'error',
              message: 'Senha invalida',
              open: true,
            }),
          );
          return;
        }
      }

      const result = await Signin.Signin({email, password});
      if (result?.error) {
        dispatch(
          setModalAction({
            type: 'error',
            message: result.message,
            open: true,
          }),
        );
        return;
      }

      if (!result?.error) {
        dispatch(
          setModalAction({
            type: 'success',
            message: result?.message,
            open: true,
          }),
        );

        if (result?.data) {
          const response = await apiUser.userInfo(
            result.data as unknown as string,
          );

          if (response?.error) {
            return;
          }

          if (!response?.error) {
            dispatch(
              setUserAction({
                user: {
                  id: response?.data?.id,
                  email: response?.data?.email,
                  exp: response?.data?.exp,
                  iat: response?.data?.iat,
                },
              }),
            );
            dispatch(
              setTokenAction({
                token: {
                  token: result.data as unknown as string,
                  exp: response?.data?.exp,
                  iat: response?.data?.iat,
                },
              }),
            );
          }
        }

        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });

        return;
      }
    } catch (error) {
      dispatch(
        setModalAction({
          type: 'error',
          message: 'Ocorreu um erro, tente mais tarde',
          open: true,
        }),
      );
      return;
    }
  };

  const handleNewRegister = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Register'}],
    });
  };
  return (
    <Container>
      <Logo
        source={require('../../assets/images/logo.png')}
        alt="logo ecommerce"
      />
      <Input
        text={'Email'}
        margintop={'4px'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        text={'Senha'}
        margintop={'4px'}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleClick} />
      <ContainerRegister>
        <Text>Você é novo aqui?</Text>
        <Touchable onPress={handleNewRegister}>
          <Text colors={themes.theme.blue_100} underline>
            Criar cadastro
          </Text>
        </Touchable>
      </ContainerRegister>
    </Container>
  );
};

export default Signing;
