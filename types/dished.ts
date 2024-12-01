export interface IDishedResponse {
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

export interface IDishedGroupResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
  name: string;
  dishes: IDishedResponse[];
}
