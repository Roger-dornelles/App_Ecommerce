/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useState} from 'react';
import Address from '../../components/Address';
import {setModalAction} from '../../store/reducers/modalReducer';
import apiUser from '../../api/user';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {InfoUser} from '../../types/InfoUser';

import {NewAddressUser} from '../ConfirmPurchaseScreen';

const Index = () => {
  const {user} = useSelector((state: RootState) => state.useReducer);
  const {address, contact, district, name, newState, number} = useSelector(
    (state: RootState) => state.newAddress,
  );

  const [infoUser, setInfoUser] = useState<InfoUser>();
  const [addressUser, setAddressUser] = useState<NewAddressUser>();

  const {id} = user;

  useEffect(() => {
    if (address && contact && district && name && newState && number) {
      setAddressUser({address, contact, district, name, newState, number});
    }

    const userInfo = async () => {
      try {
        const result = await apiUser.infoUser(id as number);

        if (result?.error) {
          setModalAction({
            type: 'error',
            message: result.message,
            open: true,
          });
        }

        if (!result?.error) {
          result?.data && setInfoUser(result.data as unknown as InfoUser);
        }
      } catch (error) {
        setModalAction({
          type: 'error',
          message: 'Ocorreu um erro, tente mais tarde',
          open: true,
        });
        return;
      }
    };

    userInfo();
  }, [id]);

  return (
    <>
      <Address user={infoUser} addressUser={addressUser} />
    </>
  );
};

export default Index;
