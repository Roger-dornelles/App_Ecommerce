import {ProductCart} from './Cart';

export interface PurchaseTypes {
  [x: string]: any;
  id: number;
  userID: number;
  name: string;
  cardName: string;
  numberOfParcelSelected: string;
  numberCad: string;
  phone: string;
  address: string;
  complement: string;
  securityCode: string;
  date: string;
  deliveryAddress: {
    address: string;
    contact: string;
    district: string;
    name: string;
    newState: string;
    number: string;
  };
  totalPurchase: string;
  userProductDataOfPurchase: ProductCart[];
  numberAddress: string;
}

export interface PurchaseUser {
  cardName: string;
  id: number;
  image: string;
  name: string;
  productAvailable: number;
  quantity: number;
  userId: number;
  valueProduct: string;
  userProductDataOfPurchase: ProductCart;
}
