'use client';
import './index.scss';
import { Drawer } from 'antd';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IDish, IDishInCart } from '@/types/dish';
import { getImage } from '@/services/file';
import { formatCurrency } from '@/utils/utils';

const Header = ({ dish, totalPrice }: { dish: IDish, totalPrice: string }) => {
  return (
    <div className="header">
      <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className="images-swiper">
        {dish.imageIds.map((imageId) => (
          <SwiperSlide key={imageId}>
            <Image src={getImage(imageId)} alt="Dish image" fill={true} objectFit='cover' />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="dish-info">
        <div className="name-price-box">
          <h1 className="name">{dish.name}</h1>
          <p className="price">{totalPrice}</p>
        </div>
        <p>{dish.description}</p>
      </div>
    </div>
  )
}

interface DishDetailProps {
  dishDetail: IDish | null;
  dishDetailOpen: boolean;
  setDishDetailOpen: Dispatch<SetStateAction<boolean>>;
  dishInCart?: IDishInCart;
  // eslint-disable-next-line no-unused-vars
  handleChangeToCart: (dish: IDish, quantity: number, note?: string) => void;
}

const DishDetailDrawer = ({ dishDetail, dishDetailOpen, setDishDetailOpen, dishInCart, handleChangeToCart }: DishDetailProps) => {
  const [note, setNote] = useState<string | undefined>(dishInCart?.note);
  const [quantity, setQuantity] = useState<number>(dishInCart?.quantity ?? 1);

  useEffect(() => {
    setQuantity(dishInCart?.quantity ?? 1)
  }, [dishInCart?.quantity])

  useEffect(() => {
    setNote(dishInCart?.note)
  }, [dishDetail, dishInCart?.note])

  if (!dishDetail) return null;

  const totalPrice = formatCurrency(dishDetail.price * quantity);
  const quantityChanged = quantity - (dishInCart?.quantity ?? 0);

  return (
    <Drawer
        placement="bottom"
        closable={false}
        open={dishDetailOpen}
        key="bottom"
        height="100%"
        className="dish-detail"
      >
        <div className="close-button" onClick={() => setDishDetailOpen(false)}>
          <X />
        </div>
        <Header dish={dishDetail} totalPrice={totalPrice} />
        <div className="body">
          <div className="note-container">
            <p className="note-label">Note to restaurant</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="note-input" placeholder="Optional" />
          </div>
          <div className="actions-container">
            <div className="decrease action-box" onClick={() => setQuantity(quantity - 1)}>
              <Minus size={16} color="#ee702d" strokeWidth={3} />
            </div>
            <div className="quantity action-box">{quantity}</div>
            <div className="increase action-box" onClick={() => setQuantity(quantity + 1)}>
              <Plus size={16} color="#ee702d" strokeWidth={3} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={() => {
            handleChangeToCart(dishDetail, quantityChanged, note);
            setDishDetailOpen(false);
          }}>Add to cart - {totalPrice}</button>
        </div>
      </Drawer>
  )
}

export default DishDetailDrawer;