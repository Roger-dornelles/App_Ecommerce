import React from 'react';

import DisplayCart from '../../components/DisplayCart';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {View} from 'react-native';

const RequestScreen = () => {
  const {cart} = useSelector((state: RootState) => state.cartReducer);

  return (
    <View>
      <DisplayCart cart={cart} />
    </View>
  );
};

export default RequestScreen;
