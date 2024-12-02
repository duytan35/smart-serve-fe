import { IDish } from './dish';

export interface IDishGroup {
  id: number;
  groupName: string;
  dishes: IDish[];
}

export interface IMenu {
  restaurantId: string;
  restaurantName: string;
  restaurantAvatar: string;
  restaurantAddress: string;

  menu: IDishGroup[];
}
