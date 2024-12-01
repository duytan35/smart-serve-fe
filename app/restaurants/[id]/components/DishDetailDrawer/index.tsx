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
import { Dispatch, SetStateAction } from 'react';

const Header = () => {
  return (
    <div className="header">
      <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className="images-swiper">
        <SwiperSlide>
          <Image src="http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d" alt="Dish image" fill={true} objectFit='cover' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="http://localhost:5000/api/v1/files/4151f059-b37e-47db-b833-c3e7e416ca3d" alt="Dish image" fill={true} objectFit='cover' />
        </SwiperSlide>
      </Swiper>

      <div className="dish-info">
        <div className="name-price-box">
          <h1 className="name">Grilled chicken</h1>
          <p className="price">59000</p>
        </div>
        <p>Grilled chicken with sour (description)</p>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <button>Add to cart - 118000</button>
    </div>
  )
}

interface DishDetailProps {
  setDishDetailOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const DishDetailDrawer = ({ setDishDetailOpen, open }: DishDetailProps) => {
  return (
    <Drawer
        placement="bottom"
        closable={false}
        open={open}
        key="bottom"
        height="100%"
        className="dish-detail"
      >
        <div className="close-button" onClick={() => setDishDetailOpen(false)}>
          <X />
        </div>
        <Header />
        <div className="body">
          <div className="note-container">
            <p className="note-label">Note to restaurant</p>
            <textarea className="note-input" placeholder="Optional" />
          </div>
          <div className="actions-container">
            <div className="decrease action-box">
              <Minus size={16} color="#ee702d" strokeWidth={3} />
            </div>
            <div className="quantity action-box">2</div>
            <div className="increase action-box">
              <Plus size={16} color="#ee702d" strokeWidth={3} />
            </div>
          </div>
        </div>
        <Footer />
      </Drawer>
  )
}

export default DishDetailDrawer;