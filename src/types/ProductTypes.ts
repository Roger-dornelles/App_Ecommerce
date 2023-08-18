export interface ImageType {
  [x: string]: unknown;
  createdAt: string;
  id: string;
  link: string;
  updatedAt: string;
  userID: string;
  map: () => unknown;
}

export interface ProductType {
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
