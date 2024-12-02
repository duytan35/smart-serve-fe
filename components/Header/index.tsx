import React, { useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selecter/mainSelector';
import { Col, Row } from 'antd';
import Mbutton from '../BasicUi/MButton/Mbutton';
import { removeUser } from '@/redux/reducers/userReducer';
import { useRouter } from 'next/navigation';
import { getMeThunk } from '@/redux/actions/authThunk';

const Header = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('accesstoken');
    dispatch(removeUser());
    router.push('/sign-in');
  };

  useEffect(() => {
    if (user?.name === undefined) {
      const accesstoken = localStorage.getItem('accesstoken');
      if (accesstoken) {
        dispatch(getMeThunk());
      } else {
        router.push('/sign-in');
      }
    }
  }, [user]);

  return (
    <Row className="header_container" gutter={20} justify={'space-between'}>
      <Col className="restaurant_name title-md">{user?.name}</Col>
      <Col>
        <Row>
          <Col>
            <Mbutton onClick={logout}>Logout</Mbutton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
