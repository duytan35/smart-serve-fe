import React from 'react';
import './styles.scss';
import { Col, Row } from 'antd';
import Mbutton from '../BasicUi/MButton/Mbutton';
import { useRouter } from 'next/navigation';

const MainHeader = () => {
  const router = useRouter();

  return (
    <Row className="main-header_container" justify={'space-between'}>
      <Col className="title-md color-white">Restaurant Management</Col>
      <Col>
        <Row gutter={12}>
          <Col>
            <Mbutton
              onClick={() => {
                router.push('/sign-in');
              }}
            >
              Sign in
            </Mbutton>
          </Col>
          <Col>
            <Mbutton>Sign up</Mbutton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MainHeader;
