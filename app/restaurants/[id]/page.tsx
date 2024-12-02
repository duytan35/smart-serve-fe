'use client'

import Image from 'next/image';
import { Copyright, MapPin, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterCard from './components/FilterCard';
import DishDetailDrawer from './components/DishDetailDrawer';
import MyCartDrawer from './components/MyCart';
import { useParams, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import ClientApi from '@/services/client';
import { IDish, IDishInCart } from '@/types/dish';
import { getImage } from '@/services/file';

interface ActionsProps {
  dish: IDish;
  quantity: number;
  // eslint-disable-next-line no-unused-vars
  handleChangeToCart: (dish: IDish, quantity: number, note?: string) => boolean;
}

const Actions = ({ dish, quantity, handleChangeToCart }: ActionsProps) => {
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (quantity === 0) setShowActions(false);
  }, [quantity])

  return (
    <div className="actions">
      <div className={`decrease action-box ${!showActions ? 'hidden' : ''}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        handleChangeToCart(dish, -1);
        e.stopPropagation();
      }}>
        <Minus size={16} strokeWidth={2} />
      </div>
      <div className={`quantity action-box ${!showActions && quantity === 0 ? 'hidden' : ''}`} onClick={(e) => {
        setShowActions(!showActions);
        e.stopPropagation();
      }}>{quantity}</div>
      <div className={`increase action-box ${!showActions && quantity > 0 ? 'hidden' : ''}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        handleChangeToCart(dish, 1);
        e.stopPropagation();
      }}>
        <Plus size={16} strokeWidth={2} />
      </div>
    </div>
  )
}

const ClientPage = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  
  const restaurantId = params.id;
  const tableId = searchParams.get('tableId') ?? '';

  const [filter, setFilter] = useState('All')
  const [dishDetailOpen, setDishDetailOpen] = useState(false);
  const [dishDetail, setDishDetail] = useState<IDish | null>(null);
  const [myCartOpen, setMyCartOpen] = useState(false);
  const [dishesInCart, setDishesInCart] = useState<IDishInCart[]>([]);

  const { data, isLoading, error } = useSWR(
    ['menu', restaurantId],
    () =>
      ClientApi.getMenu({ restaurantId, tableId }),
  );

  if (error) {
    return (
      <div>
        <h1>Oops! The page not found!</h1>
      </div>
    )
  }

  if (!data) return null;

  const filters = ['All', ...data.menu.map((dishGroup) => dishGroup.groupName)]
  const dishes = filter !== 'All' ? data.menu.find(g => g.groupName === filter)?.dishes : data.menu.reduce<IDish[]>((acc, dishGroup) => {
    return [...acc, ...dishGroup.dishes]
  }, [])

  const handleChangeToCart = (dish: IDish, quantity: number, note?: string) => {
    const dishInCart = dishesInCart.find(dishInCart => dishInCart.dish.id === dish.id)
    const updatedQuantity = (dishInCart?.quantity ?? 0) + quantity
    
    if (updatedQuantity < 0) return false;
    if (updatedQuantity === 0) {
      setDishesInCart(dishesInCart.filter(dishInCart => dishInCart.dish.id !== dish.id))
    } else {
      if (dishInCart) {
        setDishesInCart(dishesInCart.map(dishInCart => dishInCart.dish.id === dish.id ? { dish: dishInCart.dish, quantity: updatedQuantity, note: note ?? dishInCart.note } : dishInCart))
      } else {
        setDishesInCart([...dishesInCart, { dish, quantity: updatedQuantity, note }])
      }
    }
    return true;
  }

  const getQuantityInCart = (dish: IDish) => {
    const dishInCart = dishesInCart.find(dishInCart => dishInCart.dish.id === dish.id)
    return dishInCart?.quantity ?? 0;
  }

  const handleOrder = () => {
    // method to handle order
  }

  return (
    <>
      <div className="header">
        <Image className="avatar" src={data.restaurantAvatar ? getImage(data.restaurantAvatar) : 'http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d'} alt="Restaurant image" width={1000} height={1000} />
        <div className="restaurant-info">
          <h1 className="name">{data.restaurantName}</h1>
          <div className="address">
            <MapPin width={16} height={16} />
            <p>{data.restaurantAddress}</p>
          </div>
        </div>
      </div>
      <div className="filters scrollbar-hide">
        {filters.map((value, index) => (
          <FilterCard key={index} value={value} setFilter={setFilter} isSelected={filter === value} />
        ))}
      </div>
      <div className="menu">
        <h2 className="title">Menu</h2>
        <div className="grid">
          {dishes?.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <div className="image-container" onClick={() => {
                setDishDetail(dish);
                setDishDetailOpen(true);
              }}>
                <Image className="dish-image" src={getImage(dish.imageIds[0])} alt="dish image" fill objectFit="cover" />
                <Actions dish={dish} quantity={getQuantityInCart(dish)} handleChangeToCart={handleChangeToCart} />
              </div>
              <h4 className="dish-name">{dish.name}</h4>
              <p className="price">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cart" onClick={() => setMyCartOpen(true)}>
        <ShoppingBag />
        {dishesInCart.length > 0 && <div className="quantity">
          {dishesInCart.reduce((acc, dish) => acc + dish.quantity, 0)}
        </div>}
      </div>

      <div className="footer">
        <Copyright size={14} /> {new Date().getFullYear()} Smart serve. All rights reserved.
      </div>

      <DishDetailDrawer dishDetail={dishDetail}  dishDetailOpen={dishDetailOpen} setDishDetailOpen={setDishDetailOpen} dishInCart={dishesInCart.find(d => d.dish.id === dishDetail?.id)} handleChangeToCart={handleChangeToCart} />
      <MyCartDrawer myCartOpen={myCartOpen} setMyCartOpen={setMyCartOpen} dishesInCart={dishesInCart} handleChangeToCart={handleChangeToCart} />
    </>
  )
}

export default ClientPage