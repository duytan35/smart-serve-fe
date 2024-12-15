'use client';

import './index.scss';
import { Button, Modal, notification } from 'antd';
import withAuth from '@/components/WithAuth';
import { formatCurrency, getImage } from '@/utils';
import { useState } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import DishGroupModal from '@/app/menu/components/DishGroupModal';
import DishModal from '@/app/menu/components/DishModal';
import { IDish, IDishGroup } from '@/types/dish';
import useSWR, { mutate } from 'swr';
import DishApi from '@/services/dishes/index';
import { Loading } from '@/components/Loading';
import Image from 'next/image';
import useSWRMutation from 'swr/mutation';

const { confirm } = Modal;

const Menu = () => {
  const [visibleModals, setVisibleModals] = useState({
    dishGroupModal: false,
    dishModal: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDishGroupId, setSelectedDishGroup] = useState(0);
  const [selectedDish, setSelectedDish] = useState<IDish>();

  const { data: dishGroups = [], isLoading: isDishGroupsLoading } = useSWR(
    'dish-groups',
    DishApi.getDishGroups,
    {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          if (
            !selectedDishGroupId ||
            !data.find((group) => group.id === selectedDishGroupId)
          ) {
            setSelectedDishGroup(data[0].id);
          }
        }
      },
    },
  );

  const { trigger: triggerRemoveGroup, isMutating: isRemovingGroup } =
    useSWRMutation(
      'remove-dish-group',
      async (
        _: string,
        {
          arg,
        }: {
          arg: {
            id: number;
          };
        },
      ) => DishApi.deleteDishGroup(arg),
      {
        onSuccess: () => {
          notification.success({
            message: 'Remove dish successfully!',
          });
          mutate('dish-groups');
        },
        onError: (error) => {
          console.error('Error Remove dish:', error);
          notification.error({
            message: 'Remove dish group failed!',
          });
        },
      },
    );

  if (isDishGroupsLoading) {
    return <Loading />;
  }

  const GroupCard = ({
    group,
    active,
    onClick,
  }: {
    group: IDishGroup;
    active?: boolean;
    onClick: () => void;
  }) => {
    return (
      <div className={`group-card ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="name">{group.name}</div>
        <div className="quantity">
          {group.dishes.length} dish{group.dishes.length > 1 ? 'es' : ''}{' '}
        </div>
      </div>
    );
  };

  const handleRemoveGroup = (groupId: number) => {
    confirm({
      title: 'Are you sure you want to remove this group?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: isRemovingGroup ? 'Removing...' : 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => triggerRemoveGroup({ id: groupId }),
    });
  };

  return (
    <div className="menu-container">
      <div className="container-header">
        <div className="title">Menu</div>
        <div className="group-button">
          <Button
            color="primary"
            icon={<PlusOutlined />}
            variant="outlined"
            onClick={() =>
              setVisibleModals({ ...visibleModals, dishGroupModal: true })
            }
          >
            Add group
          </Button>
          <Button
            color="primary"
            icon={<PlusOutlined />}
            variant="outlined"
            onClick={() =>
              setVisibleModals({ ...visibleModals, dishModal: true })
            }
          >
            Add dish
          </Button>
        </div>
      </div>

      <div className="menu">
        <div className="groups">
          {dishGroups?.map((group) => (
            <GroupCard
              group={group}
              active={group.id === selectedDishGroupId}
              key={group.id}
              onClick={() => setSelectedDishGroup(group.id)}
            />
          ))}
        </div>
        <div className="divide" />
        <div className="dishes">
          <div className="grid">
            {dishGroups
              .find((group) => group.id === selectedDishGroupId)
              ?.dishes.map((dish) => (
                <div
                  className="dish-container"
                  key={dish.id}
                  onClick={() => {
                    setSelectedDish(dish);
                    setVisibleModals({ ...visibleModals, dishModal: true });
                    setIsEditing(true);
                  }}
                >
                  <div className="image-container">
                    <Image
                      src={getImage(dish.imageIds[0])}
                      alt="dish image"
                      width={200}
                      height={200}
                      className="dish-image"
                    />
                  </div>
                  <div className="dish-info">
                    <div className="name">{dish.name}</div>
                    <div className="price">{formatCurrency(dish.price)}</div>
                    <div className="description">{dish.description}</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="button-group">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setIsEditing(true);
                setVisibleModals({ ...visibleModals, dishGroupModal: true });
              }}
            >
              Change group name
            </Button>
            <Button
              color="danger"
              variant="outlined"
              onClick={() => handleRemoveGroup(selectedDishGroupId)}
            >
              Remove group
            </Button>
          </div>
        </div>
      </div>

      <DishGroupModal
        visible={visibleModals.dishGroupModal}
        onCancel={() => {
          setVisibleModals({ ...visibleModals, dishGroupModal: false });
          setIsEditing(false);
        }}
        initialValues={
          isEditing
            ? dishGroups.find((g) => g.id === selectedDishGroupId)
            : undefined
        }
      />
      <DishModal
        dishGroupId={selectedDishGroupId}
        visible={visibleModals.dishModal}
        onCancel={() => {
          setVisibleModals({ ...visibleModals, dishModal: false });
          setIsEditing(false);
        }}
        initialValues={isEditing ? selectedDish : undefined}
      />
    </div>
  );
};

export default withAuth(Menu);
