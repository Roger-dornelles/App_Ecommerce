import React, {useEffect, useState} from 'react';
import apiStates from '../../api/states';
import apiCreateRegister from '../../api/CreateRegister';
import apiUser from '../../api/userInfo';

import {
  Container,
  AreaAddress,
  Logradouro,
  NumberAddress,
  Button,
} from './styles';
import Input from '../../components/Input';
import {StatesType} from '../../types/State';
import {useDispatch} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';
import Select from '../../components/Select';
import {ValidateName} from '../../utils/validateName';
import ValidateEmail from '../../utils/validateEmail';
import Text from '../../components/Text';
import themes from '../../themes/themes';
import {useNavigation} from '@react-navigation/native';
import ValidatePassword from '../../utils/validatePassword';
import ValidateAndMaskCpf from '../../utils/ValidateAndMaskCpf';
import {ValidatePhone} from '../../utils/validatePhone';

import {RegisterNewUser} from '../../types/RegistreNewUser';
import {setUserAction} from '../../store/reducers/userReducer';
import {setTokenAction} from '../../store/reducers/signinReducer';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {reset} = useNavigation();

  const [statesAll, setStatesAll] = useState<StatesType[]>([]);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>();
  const [logradouro, setLogradouro] = useState<string>();
  const [numberAddress, setNumberAddress] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [stateSelected, setStateSelected] = useState<string>('');
  const [cpf, setCpf] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  useEffect(() => {
    const states = async () => {
      try {
        const result = await apiStates.states();

        if (result?.error) {
          dispatch(
            setModalAction({
              type: 'error',
              message: 'Ocorreu um erro ao exibir os ESTADOS',
              open: true,
            }),
          );
        }

        if (!result?.error) {
          setStatesAll(result?.data as unknown as StatesType[]);
        }
      } catch (err) {
        dispatch(
          setModalAction({
            type: 'error',
            message: 'Ocorreu um erro ao exibir os ESTADOS',
            open: true,
          }),
        );
      }
    };
    states();
  }, [dispatch]);

  const handleDisplayListStates = (state: string) => {
    setStateSelected(state);
  };

  const handleConfirmRegister = async () => {
    try {
      if (
        !name ||
        !contact ||
        !logradouro ||
        !email ||
        !numberAddress ||
        !district ||
        !password ||
        !confirmPassword ||
        !stateSelected ||
        !cpf
      ) {
        dispatch(
          setModalAction({
            type: 'error',
            message: 'Preencha todos os campos',
            open: true,
          }),
        );
      }

      if (password !== confirmPassword) {
        dispatch(
          setModalAction({
            type: 'error',
            message: 'Senhas devem ser IGUAIS',
            open: true,
          }),
        );
      }

      const registerUser = {
        name,
        contact,
        logradouro,
        email,
        numberAddress: Number(numberAddress),
        district,
        password,
        stateSelected,
        cpf,
      };

      const result = await apiCreateRegister.register(
        registerUser as RegisterNewUser,
      );

      if (result?.error) {
        dispatch(
          setModalAction({
            open: true,
            message: result.message,
            type: 'error',
          }),
        );
      }

      if (!result?.error) {
        dispatch(
          setModalAction({
            open: true,
            message: result?.message,
            type: 'success',
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
      }
    } catch (err) {
      dispatch(
        setModalAction({
          type: 'error',
          message: 'Ocorreu um erro, tente mais tarde',
          open: true,
        }),
      );
    }
  };

  return (
    <Container>
      <Input
        text="Nome Completo"
        value={name}
        onChangeText={(text: React.SetStateAction<string>) => setName(text)}
        isError={Boolean(name && !ValidateName(name))}
        messageError="Nome deve conter somente caracteres"
      />
      <Input
        text="E-mail"
        value={email}
        onChangeText={(text: React.SetStateAction<string | undefined>) =>
          setEmail(text)
        }
        isError={Boolean(email && !ValidateEmail(email as string))}
        messageError="Digite um E-mail valido"
      />
      <Input
        text="Cpf"
        value={cpf}
        onChangeText={(text: string) => setCpf(ValidateAndMaskCpf(text))}
        inputMode="numeric"
        maxLength={14}
        isError={Boolean(cpf && ValidateAndMaskCpf(cpf))}
        messageError="CPF invalido"
      />
      <Input
        text="Celular"
        inputMode="numeric"
        value={contact}
        onChangeText={(text: React.SetStateAction<string | undefined>) =>
          setContact(ValidatePhone(text as string))
        }
        maxLength={15}
      />
      <AreaAddress>
        <Logradouro>
          <Input
            text="Endereço"
            value={logradouro}
            onChangeText={(text: React.SetStateAction<string | undefined>) =>
              setLogradouro(text)
            }
          />
        </Logradouro>

        <NumberAddress>
          <Input
            text="Numero"
            inputMode="numeric"
            value={numberAddress}
            onChangeText={(text: React.SetStateAction<string | undefined>) =>
              setNumberAddress(text)
            }
          />
        </NumberAddress>
      </AreaAddress>

      <Input
        text="Bairro"
        value={district}
        onChangeText={(text: React.SetStateAction<string | undefined>) =>
          setDistrict(text)
        }
      />
      <Select
        data={statesAll}
        handleDisplayListState={handleDisplayListStates}
        text={'Selecionar estado'}
      />
      <Input
        text="Senha "
        value={password}
        onChangeText={(text: React.SetStateAction<string | undefined>) =>
          setPassword(text)
        }
        fontSizeError={12}
        isError={Boolean(password && !ValidatePassword(password))}
        messageError="minimo 9 caracters, MAIUSCULAS, MINUSCULAS, caracter ESPECIAIS"
      />
      <Input
        text="Confirmar senha"
        value={confirmPassword}
        onChangeText={(text: React.SetStateAction<string | undefined>) =>
          setConfirmPassword(text)
        }
        fontSizeError={12}
        isError={Boolean(confirmPassword && !ValidatePassword(confirmPassword))}
        messageError="minimo 9 caracters, MAIUSCULAS, MINUSCULAS, caracter ESPECIAIS"
      />

      <Button onPress={handleConfirmRegister}>
        <Text
          text="CRIAR CADASTRO"
          textAlign="center"
          color={themes.theme.white}
        />
      </Button>

      <Button
        bgColor={themes.theme.red_100}
        onPress={() => {
          reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        }}>
        <Text text="CANCELAR" textAlign="center" color={themes.theme.white} />
      </Button>
    </Container>
  );
};

export default RegisterScreen;
