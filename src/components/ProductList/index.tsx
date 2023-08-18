import React from 'react';
import config from '../../../config';
import {Container, Area} from './styles';

import {ProductType} from '../../types/ProductTypes';
import Text from '../Text';
import Image from '../Image';

interface ItemType {
  item: ProductType;
}

interface ProductsListProps {
  products: ItemType;
  image: string | any;
}

const ProductList = ({products, image}: ProductsListProps) => {
  const handleDisplayProduct = () => {
    console.log('clicou ', products);
  };
  return (
    <Container>
      <Area onPress={handleDisplayProduct}>
        <Image
          image={image[0].replace('http://localhost:5000', config.BASE_URL)}
          width={260}
          height={190}
        />

        <Text text={products.item.name} fontSize={19} />
        <Text text={products.item.value} />
        <Text text={`Quantidade disponível ${products.item.quantity}`} />
      </Area>
    </Container>
  );
};

export default ProductList;
