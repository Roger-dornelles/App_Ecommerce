import {ImageType} from './ProductTypes';

export interface Cart {
  map(arg0: (k: any) => any): any;
  createdAt: string;
  description: string;
  id: number;
  isInstallments: boolean;
  name: string;
  photosID: ImageType[];
  quantity: number;
  updatedAt: string;
  userID: number;
  value: string;
  quantityPurchase: number;
}

export interface ProductCart {
  id: number;
  name: string;
  image: string;
  userId: number;
  quantity: number;
  productAvailable: number;
  valueProduct: string | number | any;
  totalPurchase?: string | number;
}
