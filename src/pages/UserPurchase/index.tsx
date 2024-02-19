/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Container} from './styles';
import Text from '../../components/Text';

import apiUserPurchase from '../../api/UserPurchase';
import {useDispatch, useSelector} from 'react-redux';
import {setModalAction} from '../../store/reducers/modalReducer';
import {RootState} from '../../store';
import {PurchaseTypes} from '../../types/Purchase';
import {useAuth} from '../../hooks/useAuth';

import themes from '../../themes/themes';
import ListPurchasesUser from './ListPurchasesUser';

const Index = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.useReducer);

  const {AuthRoute} = useAuth();
  const handleBack = () => {
    AuthRoute('Home');
  };

  const [purchaseUser, setPurchaseUser] = useState<PurchaseTypes[]>([]);

  const userPurchases = async () => {
    try {
      const result = await apiUserPurchase.userPurchase(user.id as number);

      if (result?.error) {
        dispatch(
          setModalAction({
            message: result.message,
            open: true,
            type: 'error',
          }),
        );
      }

      if (!result?.error) {
        setPurchaseUser(result?.data);
      }
    } catch (err) {
      dispatch(
        setModalAction({
          message: 'Ocorreu um erro, tente mais tarde.',
          type: 'error',
          open: true,
        }),
      );
    }
  };

  useEffect(() => {
    userPurchases();
  }, []);

  const purchases = purchaseUser?.map(i => i.userProductDataOfPurchase);
  const purchasesUser = purchases?.map(k => k[0]);

  return (
    <Container>
      <Text
        text="Voltar"
        fontSize={17}
        onPress={handleBack}
        color={themes.theme.blue_100}
      />

      {purchaseUser && (
        <ListPurchasesUser
          purchaseUser={purchaseUser}
          userProductDataOfPurchase={purchasesUser}
          id={0}
          userID={0}
          name={''}
          cardName={''}
          numberOfParcelSelected={''}
          numberCad={''}
          phone={''}
          address={''}
          complement={''}
          securityCode={''}
          date={''}
          deliveryAddress={{
            address: '',
            contact: '',
            district: '',
            name: '',
            newState: '',
            number: '',
          }}
          totalPurchase={''}
          numberAddress={''}
        />
      )}
    </Container>
  );
};

export default Index;
