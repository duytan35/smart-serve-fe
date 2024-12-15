import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import useSWRMutation from 'swr/mutation';
import DishApi from '@/services/dishes/index';
import { mutate } from 'swr';

interface DishGroupModalProps {
  visible: boolean;
  onCancel: () => void;
  initialValues?: {
    id: number;
    name: string;
  };
}

const DishGroupModal = ({
  visible,
  onCancel,
  initialValues,
}: DishGroupModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const { trigger: triggerCreateDishGroup, isMutating: isCreating } =
    useSWRMutation(
      'create-dish-group',
      async (
        _: string,
        {
          arg,
        }: {
          arg: {
            name: string;
          };
        },
      ) => DishApi.createDishGroup(arg),
      {
        onSuccess: () => {
          notification.success({
            message: 'Create dish group successfully!',
          });
          mutate('dish-groups');
        },
        onError: (error) => {
          console.error('Error create dish group:', error);
          notification.error({
            message: 'Create dish group failed!',
          });
        },
      },
    );

  const { trigger: triggerUpdateDishGroup, isMutating: isUpdating } =
    useSWRMutation(
      'update-dish-group',
      async (
        _: string,
        {
          arg,
        }: {
          arg: {
            name: string;
            id: string;
          };
        },
      ) => DishApi.updateDishGroup(arg),
      {
        onSuccess: () => {
          notification.success({
            message: 'Update dish group successfully!',
          });
          mutate('dish-groups');
        },
        onError: (error) => {
          console.error('Error update dish group:', error);
          notification.error({
            message: 'Update dish group failed!',
          });
        },
      },
    );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues) {
        triggerUpdateDishGroup({
          ...values,
          id: initialValues?.id,
        });
      } else {
        triggerCreateDishGroup(values);
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Modal
      title="Add Dish Group"
      open={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={
        <Button
          onClick={handleSubmit}
          type="primary"
          loading={isCreating || isUpdating}
        >
          Confirm
        </Button>
      }
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Group Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a group name!' }]}
        >
          <Input placeholder="Enter group name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DishGroupModal;
