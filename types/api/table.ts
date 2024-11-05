export interface ITableResponse {
  createdAt: string;
  id: number;
  name: string;
  restaurantId: string; // UUID string
  seats: number;
  updatedAt: string;
}
