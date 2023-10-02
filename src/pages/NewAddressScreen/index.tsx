import React, {useEffect, useState} from 'react';
import Text from '../../components/Text';
import {Container, Error, TouchableOpacity} from './styles';

import themes from '../../themes/themes';
import Input from '../../components/Input';

import useValidateName from '../../hooks/useValidateName';

import apiStates from '../../api/states';
import {useDispatch} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';
import {StatesType} from '../../types/State';

import Select from '../../components/Select';

import {setNewAddress} from '../../store/reducers/newAddress';
import {useAuth} from '../../hooks/useAuth';

const NewAddressScreen = () => {
  const [statesAll, setStatesAll] = useState<StatesType[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [stateSelected, setStateSelected] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const dispatch = useDispatch();

  const {AuthRoute} = useAuth();

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

  const phoneMask = (value: string) => {
    if (!value) {
      return '';
    }
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
  };

  const isNameValidate = useValidateName(name);

  const handleSubmitData = () => {
    if (name && contact && number && address && stateSelected && district) {
      dispatch(
        setNewAddress({
          address: address.toLowerCase(),
          contact: contact.toLowerCase(),
          district: district.toLowerCase(),
          name: name.toLowerCase(),
          number: number.toLowerCase(),
          newState: stateSelected,
        }),
      );

      AuthRoute('Endereço');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2200);
    }
  };

  const handleBackAddress = () => {
    AuthRoute('Endereço');
  };

  return (
    <>
      {error && <Error>Preencha todos os campos</Error>}
      <Container>
        <Input
          text="Nome"
          value={name}
          onChangeText={text => setName(text)}
          isError={name !== '' && !isNameValidate}
          messageError={'Nome invalido'}
        />

        <Input
          inputMode="numeric"
          text="Celular"
          value={contact}
          maxLength={15}
          onChangeText={text => setContact(phoneMask(text))}
        />

        <Input
          text="Endereço"
          value={address}
          onChangeText={text => setAddress(text)}
        />
        <Input
          text="Numero"
          value={number}
          onChangeText={text => setNumber(text)}
        />
        <Input
          text="Bairro"
          value={district}
          onChangeText={text => setDistrict(text)}
        />
        <Select
          data={statesAll}
          handleDisplayListState={handleDisplayListStates}
          text={'Selecionar estado'}
        />

        <TouchableOpacity
          BgColor={themes.theme.blue_100}
          onPress={handleSubmitData}>
          <Text text="Cadastrar endereço" textAlign="center" />
        </TouchableOpacity>

        <TouchableOpacity
          BgColor={themes.theme.red_100}
          onPress={handleBackAddress}>
          <Text text="Cancelar" textAlign="center" />
        </TouchableOpacity>
      </Container>
    </>
  );
};

export default NewAddressScreen;
