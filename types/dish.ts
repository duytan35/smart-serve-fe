export interface IDish {
  id: number;
  createdAt: string;
  updatedAt: string;
  dishGroupId: number;
  name: string;
  description: string;
  price: number;
  status: number;
  imageIds: string[];
}

export interface IDishGroup {
  id: number;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
  name: string;
  dishes: IDish[];
}

export interface IDishInCart {
  dish: IDish;
  quantity: number;
  note?: string;
}

export interface ICreateDish {
  dishGroupId: number;
  description?: string;
  imageIds: string[];
  name: string;
  price: number;
  status?: number;
}
