import React from 'react';
import Text from '../../../components/Text';
import {FlatList} from 'react-native';
import {ContainerFlatList, List} from './styles';
import {PurchaseTypes, PurchaseUser} from '../../../types/Purchase';

import {ProductCart} from '../../../types/Cart';

interface RenderItem {
  item: PurchaseUser;
}

interface IMap {
  userProductDataOfPurchase: ProductCart;
  cardName: string;
  total: string;
  numberParcelOfValue: string;
}

interface RenderListPurchaseTypes {
  id: number;
  name: string;
}

const Index = ({purchaseUser}: PurchaseTypes) => {
  const renderListPurchase = (item: RenderListPurchaseTypes) => {
    return (
      <List key={item.id}>
        <Text text={`${item.name}`} />
      </List>
    );
  };

  return (
    <>
      {purchaseUser &&
        purchaseUser.map((i: IMap) => {
          return (
            <>
              <ContainerFlatList>
                <FlatList
                  data={i.userProductDataOfPurchase}
                  renderItem={({item}: RenderItem) => renderListPurchase(item)}
                  keyExtractor={item => item.id}
                />

                <Text text={`Total ${i.total}`} />
                <Text text={`Parcelas ${i.numberParcelOfValue}`} />
              </ContainerFlatList>
            </>
          );
        })}
    </>
  );
};

export default Index;
