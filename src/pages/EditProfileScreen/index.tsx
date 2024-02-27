/* eslint-disable react-native/no-inline-styles */

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import {Container, ContainerButton, BackButton, Error, Success} from './styles';

import userApi from '../../api/user';
import apiStates from '../../api/states';
import apiUserUpdate from '../../api/UserUpdate';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {setModalAction} from '../../store/reducers/modalReducer';

import {InfoUser} from '../../types/InfoUser';
import InputEditProfile from './InputEditProfile';
import Select from '../../components/Select';
import {StatesType} from '../../types/State';
import {Button} from 'react-native';
import themes from '../../themes/themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAuth} from '../../hooks/useAuth';

import {ValidateName} from '../../utils/validateName';
import {ValidatePhone} from '../../utils/validatePhone';
import ValidateEmail from '../../utils/validateEmail';
import ValidatePassword from '../../utils/validatePassword';
// import UserUpdateData from '../../types/UserUpdateData';

const Index = () => {
  const {AuthRoute} = useAuth();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [logradouro, setLogradouro] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [states, setStates] = useState<string>('');
  const [statesAll, setStatesAll] = useState<StatesType[]>([]);
  const [error, setError] = useState<{error: boolean}>({
    error: false,
  });
  const [inputError, setInputError] = useState<string[]>([]);
  const [resultApi, setResultApi] = useState<{
    type: 'error' | 'success' | undefined;
    message: string;
  }>({
    type: undefined,
    message: '',
  });

  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.useReducer);

  const userData = async () => {
    try {
      if (user.id) {
        const result = await userApi.infoUser(user.id);

        if (!result?.error) {
          const users: InfoUser = result?.data;

          setName(users.name);
          setEmail(users.email);
          setLogradouro(users.logradouro);
          setNumber(String(users.number));
          setContact(users.contact);
          setDistrict(users.district);
          setStates(users.state);
        } else {
          dispatch(
            setModalAction({
              open: true,
              message: 'ocorreu um erro, tente mais tarde',
              type: 'error',
            }),
          );
        }
      }
    } catch (err) {
      dispatch(
        setModalAction({
          open: true,
          message: 'ocorreu um erro, tente mais tarde',
          type: 'error',
        }),
      );
    }
  };

  const statesUser = async () => {
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

  const handleBackButton = () => {
    AuthRoute('Home');
  };

  const invalidsInputs: string[] = [];
  const handleConfirmEditProfile = async () => {
    try {
      if (!ValidateName(name)) {
        setError({error: true});
        invalidsInputs.push('Nome');
      }

      if (!ValidateEmail(email)) {
        setError({error: true});
        invalidsInputs.push('Email');
      }

      if (password && confirmPassword) {
        if (password.length >= 9 && password === confirmPassword) {
          const isValidPassword = ValidatePassword(password);

          if (!isValidPassword) {
            setError({error: true});
            invalidsInputs.push('Senha');
          }
        } else {
          setError({error: true});
          invalidsInputs.push('Senha');
        }
      }

      if (invalidsInputs.length) {
        setInputError(invalidsInputs);
        setTimeout(() => {
          setInputError([]);
          setError({error: false});
        }, 2900);
        return;
      }

      if (
        name &&
        email &&
        contact &&
        number &&
        district &&
        logradouro &&
        states
      ) {
        const result = await apiUserUpdate.userUpdated({
          name,
          password,
          email,
          contact,
          logradouro,
          number,
          state: states,
          id: user.id,
          district,
        });
        if (result?.error) {
          setResultApi({
            type: 'error',
            message: result.message,
          });

          setTimeout(() => {
            setResultApi({type: undefined, message: ''});
          }, 2900);
        }

        if (!result?.error) {
          setResultApi({
            type: 'success',
            message: result?.message,
          });

          setTimeout(() => {
            setResultApi({type: undefined, message: ''});
            AuthRoute('Home');
          }, 2900);
        }
      } else {
        setError({error: true});
        setInputError(['Preencha todos os campos']);

        setTimeout(() => {
          setInputError([]);
          setError({error: false});
        }, 2900);
      }
    } catch (err) {
      setError({error: true});
      setInputError(['Ocorreu um erro, tente mais tarde']);

      setTimeout(() => {
        setInputError([]);
        setError({error: false});
      }, 2900);
    }
  };

  useEffect(() => {
    userData();
    statesUser();
  }, []);

  return (
    <Container>
      {error.error && (
        <Error>
          <Text text={'Erro no campo '} textAlign="center" />
          <Text
            text={`${inputError?.map((i: string) => i)}`}
            textAlign="center"
          />
        </Error>
      )}

      {resultApi.type === 'error' && (
        <Error>
          <Text text={resultApi.message} textAlign="center" />
        </Error>
      )}

      {resultApi.type === 'success' && (
        <Success>
          <Text text={resultApi.message} textAlign="center" />
        </Success>
      )}

      <BackButton onPress={handleBackButton}>
        <Icon
          name="arrow-left"
          size={20}
          style={{color: `${themes.theme.blue_100}`, paddingRight: 5}}
        />
        <Text
          text={'Voltar'}
          color={`${themes.theme.blue_100}`}
          textAlign="left"
          fontSize={18}
        />
      </BackButton>

      <InputEditProfile
        value={`${name}`}
        text="Nome"
        inputMode="text"
        onChangeText={text => setName(text)}
        error={!name}
      />

      <InputEditProfile
        value={`${email}`}
        text="Email"
        inputMode="text"
        onChangeText={text => setEmail(text)}
        error={!email}
      />

      <InputEditProfile
        value={`${contact}`}
        text="Celular"
        inputMode="text"
        onChangeText={text => setContact(ValidatePhone(text))}
        error={!contact}
        maxLength={15}
      />

      <InputEditProfile
        value={`${logradouro}`}
        text="Endereço"
        inputMode="text"
        onChangeText={text => setLogradouro(text)}
        error={!logradouro}
      />

      <InputEditProfile
        value={`${district}`}
        text="Bairro"
        inputMode="text"
        onChangeText={text => setDistrict(text)}
        error={!district}
      />

      <InputEditProfile
        value={`${number}`}
        text="Numero"
        inputMode="text"
        onChangeText={text => setNumber(text)}
        error={!number}
      />

      <InputEditProfile
        value={`${password}`}
        text="Senha"
        inputMode="text"
        onChangeText={text => setPassword(text)}
      />

      <InputEditProfile
        value={`${confirmPassword}`}
        text="Confirmar senha"
        inputMode="text"
        onChangeText={text => setConfirmPassword(text)}
      />

      <Select
        data={statesAll}
        text={states}
        handleDisplayListState={setStates}
      />

      <ContainerButton>
        <Button title="Salvar" onPress={handleConfirmEditProfile} />
      </ContainerButton>
    </Container>
  );
};

export default Index;
