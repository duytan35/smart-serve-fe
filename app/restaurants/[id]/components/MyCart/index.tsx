'use client';

import './index.scss';
import { Drawer } from 'antd';
import Image from 'next/image';
import { ArrowLeft, Minus, NotepadText, Plus } from 'lucide-react';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IDish, IDishInCart } from '@/types/dish';
import { formatCurrency, getImage, timeDifferenceFromNow } from '@/utils';
import useSWR from 'swr';
import ClientApi from '@/services/client';
import { IOrderDetail } from '@/types/order';
import { Step } from '@/types/menu';
import { OrderStatus } from '@/constants';

const Header = ({
  setMyCartOpen,
}: {
  setMyCartOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="header">
      <div className="back" onClick={() => setMyCartOpen(false)}>
        <ArrowLeft />
      </div>
      <h1 className="title">My cart</h1>
    </div>
  );
};

const EditableNote = ({
  note,
  dishId,
  handleChangeNote,
}: {
  note?: string;
  dishId: number;
  // eslint-disable-next-line no-unused-vars
  handleChangeNote: (dishId: number, note: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        textareaRef.current.value.length;
    }
  }, [isEditing]);

  return isEditing ? (
    <textarea
      ref={textareaRef}
      autoFocus
      className="note textarea"
      placeholder="Add note"
      value={note}
      onBlur={() => setIsEditing(false)}
      onChange={(e) => handleChangeNote(dishId, e.target.value)}
    />
  ) : (
    <p className="note" onClick={() => setIsEditing(true)}>
      {note || 'Add note'}
    </p>
  );
};

interface MyCartProps {
  tableId: number;
  steps: Step[];
  setMyCartOpen: Dispatch<SetStateAction<boolean>>;
  myCartOpen: boolean;
  dishesInCart: IDishInCart[];
  // eslint-disable-next-line no-unused-vars
  handleChangeToCart: (dish: IDish, quantity: number, note?: string) => void;
  handleOrder: () => void;
  // eslint-disable-next-line no-unused-vars
  handleChangeNote: (dishId: number, note: string) => void;
  isCreatingOrder: boolean;
}

const MyCartDrawer = ({
  tableId,
  steps,
  setMyCartOpen,
  myCartOpen,
  dishesInCart,
  handleChangeToCart,
  handleOrder,
  handleChangeNote,
  isCreatingOrder,
}: MyCartProps) => {
  const totalPrice = dishesInCart.reduce(
    (total, dishInCart) => total + dishInCart.dish.price * dishInCart.quantity,
    0,
  );

  const { data } = useSWR('table-order', () =>
    ClientApi.getOrderByTable({ tableId }),
  );

  const groupedData = useMemo(() => {
    if (!data) return {};

    return data.orderDetails.reduce(
      (acc, item) => {
        const group = item.groupOrderNumber.toString();
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(item);
        return acc;
      },
      {} as { [key: string]: IOrderDetail[] },
    );
  }, [data]);

  const getCurrentStep = (index: number) => {
    const maxStep = Math.max(...steps.map((step) => step.step));

    if (data?.status === OrderStatus.Complete || index > maxStep) {
      return steps.find((step) => step.step === maxStep)?.name;
    }

    return steps.find((step) => step.step === index)?.name;
  };

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
      <Header setMyCartOpen={setMyCartOpen} />
      <div className="cart-items">
        <h4 className="title">Current in cart</h4>
        {dishesInCart.map((dishInCart) => (
          <div className="cart-item" key={dishInCart.dish.id}>
            <Image
              src={getImage(dishInCart.dish.imageIds[0])}
              alt="Dish image"
              width={200}
              height={200}
              objectFit="cover"
            />
            <div className="info">
              <div className="row">
                <h4 className="name">{dishInCart.dish.name}</h4>
                <p className="price">
                  {formatCurrency(dishInCart.dish.price * dishInCart.quantity)}
                </p>
              </div>
              <div className="row">
                <div className="des-note">
                  <p>{dishInCart.dish.description}</p>
                  <div className="note-container">
                    <div className="icon-note">
                      <NotepadText size={16} />
                    </div>
                    <EditableNote
                      note={dishInCart.note}
                      dishId={dishInCart.dish.id}
                      handleChangeNote={handleChangeNote}
                    />
                  </div>
                </div>
                <div className="actions-container">
                  <div
                    className="decrease action-box"
                    onClick={() => handleChangeToCart(dishInCart.dish, -1)}
                  >
                    <Minus size={16} color="#ee702d" strokeWidth={3} />
                  </div>
                  <div className="quantity action-box">
                    {dishInCart.quantity}
                  </div>
                  <div
                    className="increase action-box"
                    onClick={() => handleChangeToCart(dishInCart.dish, 1)}
                  >
                    <Plus size={16} color="#ee702d" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {dishesInCart.length === 0 && (
          <div className="empty-text">No dishes found</div>
        )}
        <button
          className="order-button"
          onClick={() => {
            if (isCreatingOrder || dishesInCart.length === 0) return;
            handleOrder();
          }}
          disabled={isCreatingOrder || dishesInCart.length === 0}
        >
          Order - {formatCurrency(totalPrice)}
        </button>
      </div>

      {Object.keys(groupedData)
        .sort((a, b) => Number(b) - Number(a))
        .map((key) => (
          <div className="cart-items" key={key}>
            <div className="title-time">
              <h4 className="title">Order #{key}</h4>
              <p>{timeDifferenceFromNow(groupedData[key][0].createdAt)}</p>
            </div>
            {groupedData[key].map((item) => (
              <div className="cart-item" key={item.id}>
                <Image
                  src={getImage(item.imageIds[0])}
                  alt="Dish image"
                  width={200}
                  height={200}
                  objectFit="cover"
                />
                <div className="info">
                  <div className="row">
                    <h4 className="name">{item.dishName}</h4>
                    <p className="price">{formatCurrency(item.dishPrice)}</p>
                  </div>
                  <div className="row">
                    <div className="des-note">
                      <p>{item.dishDescription}</p>
                      {item.note && (
                        <div className="note-container">
                          <div className="icon-note">
                            <NotepadText size={16} />
                          </div>
                          <p className="note">{item.note ?? 'Add note'}</p>
                        </div>
                      )}
                    </div>
                    <div className="quantity-step">
                      <div className="quantity">{item.quantity}</div>
                      <div className="step">{getCurrentStep(item.step)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </Drawer>
  );
};

export default MyCartDrawer;
