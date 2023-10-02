import React from 'react';
import {AreaCards, ContainerCard, AreaCard, ImageCard} from './styles';
import Text from '../../Text';

import {ImageProps} from 'react-native';

type NameCards = {
  id: number;
  name: string;
  image: ImageProps;
};

interface CardsTypeProps {
  handleNameCardSelected: (cardName: string) => any;
  nameCards: NameCards[];
}

const Index = ({handleNameCardSelected, nameCards}: CardsTypeProps) => {
  const handleConfirmCard = (cardName: string) => {
    if (cardName) {
      handleNameCardSelected(cardName);
    }
  };

  return (
    <AreaCards>
      <Text text="Selecione a bandeira do cartão" textAlign="center" />
      <AreaCard>
        {nameCards &&
          nameCards.map(i => {
            return (
              <ContainerCard onPress={() => handleConfirmCard(i.name)}>
                <ImageCard
                  alt="imagem cartao"
                  source={i.image}
                  resizeMode="contain"
                />
              </ContainerCard>
            );
          })}
      </AreaCard>
    </AreaCards>
  );
};

export default Index;
