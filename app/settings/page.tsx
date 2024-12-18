'use client';

import './index.scss';
import CustomUpload from '@/components/CustomUpload';
import WithAuth from '@/components/WithAuth';
import { RootState } from '@/store';
import { IRestaurant, IUpdateRestaurant } from '@/types/restaurant';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CustomUploadFile } from '@/types/file';
import { useEffect, useState } from 'react';
import { getImage } from '@/utils';
import useSWRMutation from 'swr/mutation';
import RestaurantApi from '@/services/restaurant';
import { setRestaurant } from '@/store/slices/appSlice';

const Settings = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
  const restaurant = useSelector(
    (state: RootState) => state.app.restaurant as IRestaurant,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurant.avatar) {
      setFileList([
        {
          uid: restaurant.avatar,
          name: 'image',
          status: 'done',
          url: getImage(restaurant.avatar),
          imageId: restaurant.avatar,
        },
      ]);
    }
  }, [form, restaurant.avatar]);

  const { trigger: triggerUpdateRestaurant } = useSWRMutation(
    'update-restaurant',
    async (
      _: string,
      {
        arg,
      }: {
        arg: IUpdateRestaurant;
      },
    ) => RestaurantApi.update(arg),
    {
      onSuccess: (data) => {
        dispatch(
          setRestaurant({
            ...data,
            steps: restaurant.steps,
          }),
        );
        notification.success({
          message: 'Update restaurant successfully!',
        });
      },
      onError: (error) => {
        console.error('Error update restaurant:', error);
        notification.error({
          message: 'Update restaurant failed!',
        });
      },
    },
  );

  const handleUpdate = async () => {
    const values = await form.validateFields();
    triggerUpdateRestaurant({
      ...values,
      avatar: fileList.length > 0 ? fileList[0].imageId : '',
    });
  };

  return (
    <div className="settings">
      <div className="restaurant">
        <div className="title">Restaurant</div>
        <Form form={form} layout="vertical" initialValues={restaurant}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please enter email!' }]}
              >
                <Input placeholder="Enter email" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter name!',
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone!',
                  },
                ]}
              >
                <Input placeholder="Enter phone" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Cover image" name="avatar">
            <CustomUpload
              fileList={fileList}
              setFileList={setFileList}
              maxCount={1}
            />
          </Form.Item>
        </Form>
        <div className="button-group">
          <Button variant="outlined" onClick={() => form.resetFields()}>
            Cancel
          </Button>
          <Button color="primary" variant="outlined" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
      {/* <div className="steps">
        <div className="title">Steps</div>
        DND steps
      </div> */}
    </div>
  );
};

export default WithAuth(Settings);
