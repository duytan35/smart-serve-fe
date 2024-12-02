'use client';

import './index.scss';
import { Drawer } from 'antd';
import Image from 'next/image';
import { ArrowLeft, Minus, NotepadText, Plus } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { IDish, IDishInCart } from '@/types/dish';
import { getImage } from '@/services/file';
import { formatPrice } from '@/utils/utils';

const Header = ({ setMyCartOpen }: { setMyCartOpen: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="header">
      <div className="back" onClick={() => setMyCartOpen(false)}>
        <ArrowLeft />
      </div>
      <h1 className="title">My cart</h1>
    </div>
  )
}

interface MyCartProps {
  setMyCartOpen: Dispatch<SetStateAction<boolean>>;
  myCartOpen: boolean;
  dishesInCart: IDishInCart[];
  // eslint-disable-next-line no-unused-vars
  handleChangeToCart: (dish: IDish, quantity: number, note?: string) => void;
}

const MyCartDrawer = ({ setMyCartOpen, myCartOpen, dishesInCart, handleChangeToCart }: MyCartProps) => {
  const totalPrice = dishesInCart.reduce((total, dishInCart) => total + dishInCart.dish.price * dishInCart.quantity, 0);

  return (
    <Drawer
      placement="right"
      closable={false}
      open={myCartOpen}
      key="bottom"
      height="100%"
      className="my-cart"
      classNames={{
        body: 'scrollbar-hide',
        wrapper: 'my-cart-wrapper',
      }}
    >
      <Header setMyCartOpen={setMyCartOpen}/>
      <div className="cart-items">
        <h4 className="title">Current in cart</h4>
        {dishesInCart.map((dishInCart) => (
          <div className="cart-item" key={dishInCart.dish.id}>
            <Image src={getImage(dishInCart.dish.imageIds[0])} alt="Dish image" width={200} height={200} objectFit='cover' />
            <div className="info">
              <div className="row">
                <h4 className="name">{dishInCart.dish.name}</h4>
                <p className="price">{formatPrice(dishInCart.dish.price * dishInCart.quantity)}</p>
              </div>
              <div className="row">
                <div className="des-note">
                  <p>{dishInCart.dish.description}</p>
                  <div className="note-container">
                    <NotepadText size={16} />
                    <p contentEditable="true" className="note">{dishInCart.note ?? 'Add note'}</p>
                  </div>
                </div>
                <div className="actions-container">
                  <div className="decrease action-box" onClick={() => handleChangeToCart(dishInCart.dish, -1)}>
                    <Minus size={16} color="#ee702d" strokeWidth={3} />
                  </div>
                  <div className="quantity action-box">{dishInCart.quantity}</div>
                  <div className="increase action-box" onClick={() => handleChangeToCart(dishInCart.dish, 1)}>
                    <Plus size={16} color="#ee702d" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className="order-button">Order - {formatPrice(totalPrice)}</button>
      </div>

      <div className="cart-items">
        <div className="title-time">
          <h4 className="title">Order #1</h4>
          <p>10m ago</p>
        </div>
        <div className="cart-item">
          <Image src="http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d" alt="Dish image" width={200} height={200} objectFit='cover' />
          <div className="info">
            <div className="row">
              <h4 className="name">Grilled chicken</h4>
              <p className="price">118000</p>
            </div>
            <div className="row">
              <div className="des-note">
                <p>Description</p>
                <div className="note-container">
                  <NotepadText size={16} />
                  <p contentEditable="true" className="note">Note editable</p>
                </div>
              </div>
              <div className="quantity-step">
                <div className="quantity">2</div>
                <div className="step">Cooking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default MyCartDrawer;