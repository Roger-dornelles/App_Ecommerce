export interface ImageType {
  createdAt: string;
  id: string;
  link: string;
  updatedAt: string;
  userID: string;
  map: () => any;
}

export interface ProductType {
  valueProduct?: string;
  map: (i: any) => any;
  createdAt: string;
  description: string;
  id: number;
  isInstallments: boolean;
  name: string;
  photosID: ImageType | ImageType[];
  quantity: number;
  updatedAt: string;
  userID: number;
  value: string;
}
