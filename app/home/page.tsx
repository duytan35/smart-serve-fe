'use client';
import { Content } from 'antd/es/layout/layout';
import './styles.scss';
import withAuth from '@/components/withAuth';
import { Button, Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { userSelector } from '@/redux/selecter/mainSelector';
import { useEffect, useState } from 'react';
import DraggableSteps from '@/components/StepComponent';

const HomePage = () => {
  const userRedux = useSelector(userSelector);
  const [steps, setSteps] = useState(userRedux?.steps || []);

  useEffect(() => {
    if (userRedux?.steps) {
      setSteps(userRedux?.steps);
    }
  }, [userRedux]);

  return (
    <Content className="home_container">
      <Card
        title="Step"
        style={{ width: '100%' }}
        extra={
          <Row>
            <Col>
              <Button>New</Button>
            </Col>
            <Col>
              <Button>Save</Button>
            </Col>
          </Row>
        }
      >
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
          <DraggableSteps steps={steps} setSteps={setSteps} />
        </Row>
      </Card>
    </Content>
  );
};

export default withAuth(HomePage);
