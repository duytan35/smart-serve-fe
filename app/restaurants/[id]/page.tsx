'use client'

import Image from 'next/image';
import { Copyright, MapPin, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import FilterCard from './components/FilterCard';
import DishDetailDrawer from './components/DishDetailDrawer';
import MyCartDrawer from './components/MyCart';

const filters = [
  'All',
  'Beef',
  'Chicken',
  'Pork',
  'Seafood',
  'Vegan',
  'Vegetarian',
  'Spicy',
]

const dishes = [
  {
    id: 1,
    name: 'Grilled chicken123123 124',
    price: 59000,
    image: 'http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d',
    category: 'Chicken',
  },
  {
    id: 2,
    name: 'Grilled chicken',
    price: 59000,
    image: 'http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d',
    category: 'Chicken',
  },
  {
    id: 3,
    name: 'Grilled chicken',
    price: 59000,
    image: 'http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d',
    category: 'Chicken',
  },
  {
    id: 4,
    name: 'Grilled chicken',
    price: 59000,
    image: 'http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d',
    category: 'Chicken',
  },
]

const ClientPage = () => {
  const [filter, setFilter] = useState('All')
  const [dishDetailOpen, setDishDetailOpen] = useState(false);
  const [myCartOpen, setMyCartOpen] = useState(false);

  

  return (
    <>
      <div className="header">
        <Image className="avatar" src="http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d" alt="Restaurant image" width={1000} height={1000} />
        <div className="restaurant-info">
          <h1 className="name">Grill meat</h1>
          <div className="address">
            <MapPin width={16} height={16} />
            <p>36 Pasteur, Ben Nghe, Quan 1</p>
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
          {dishes.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <div className="image-container" onClick={() => setDishDetailOpen(true)}>
                <Image className="dish-image" src={dish.image} alt="dish image" fill objectFit="cover" />
                <div className="actions">
                  <div className="decrease action-box">
                    <Minus size={16} strokeWidth={2} />
                  </div>
                  <div className="quantity action-box">2</div>
                  <div className="increase action-box">
                    <Plus size={16} strokeWidth={2} />
                  </div>
                </div>
              </div>
              <h4 className="dish-name">{dish.name}</h4>
              <p className="price">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cart" onClick={() => setMyCartOpen(true)}>
        <ShoppingBag />
        <div className="quantity">
          3
        </div>
      </div>

      <div className="footer">
        <Copyright size={14} /> {new Date().getFullYear()} Smart serve. All rights reserved.
      </div>

      <DishDetailDrawer open={dishDetailOpen} setDishDetailOpen={setDishDetailOpen} />
      <MyCartDrawer myCartOpen={myCartOpen} setMyCartOpen={setMyCartOpen} />
    </>
  )
}

export default ClientPage