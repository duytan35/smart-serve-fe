export interface IDishResponse {
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

export interface IDishGroupResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
  name: string;
  dishes: IDishResponse[];
}
