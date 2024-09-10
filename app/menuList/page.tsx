'use client';
import { Button, Card, Col, Image, Row } from 'antd';
import { useRouter } from 'next/navigation';

import withAuth from '@/components/withAuth';
import { Content } from 'antd/es/layout/layout';
import './styles.scss';
import { formatPrice } from '@/utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AddDishGroupModal from '@/components/AddDishGroupModal';
import AddDishModal from '@/components/AddDishModal';

// interface MenuItem {
//     id: number;
//     createdAt: string;
//     updatedAt: string;
//     restaurantId: string;
//     name: string;
// }

// interface ListDetailItem {
//     id: number;
//     createdAt: string;
//     updatedAt: string;
//     dishGroupId: number;
//     name: string;
//     description: string;
//     price: number;
//     status: number;
// }

// interface MergedMenuItem extends MenuItem {
//     dishList: ListDetailItem[];
// }

const menuListDefault = [
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles1',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 2,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 3,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles2',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
      {
        id: 2,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles3',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles4',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles5',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles6',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles7',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles8',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles9',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles10',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles11',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles12',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles13',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
  {
    id: 1,
    createdAt: '2024-07-06T06:50:36.497Z',
    updatedAt: '2024-07-06T06:50:36.497Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Noodles',
    dishes: [
      {
        id: 1,
        createdAt: '2024-07-06T06:50:42.464Z',
        updatedAt: '2024-07-06T06:50:42.464Z',
        dishGroupId: 1,
        name: 'Phở',
        description: 'Phở bò Việt Nam',
        price: 50000,
        status: 1,
        imageIds: [],
      },
    ],
  },
];

const MenuList = () => {
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);
  const [selectMenuIndex, setSelectMenuIndex] = useState(0);
  const [visible, setVisible] = useState({
    addDishGroupModal: false,
    addDishModal: false,
  });

  useEffect(() => {
    loadMenuList();
  }, []);

  const menuListData = useMemo(() => {
    return menuList[selectMenuIndex] ? menuList[selectMenuIndex] : [];
  }, [menuList, selectMenuIndex]);

  const loadMenuList = async () => {
    setMenuList(menuListDefault);
  };

  const hanldeViewDish = (id: string) => {
    router.push(`/menuList/dishDetail/${id}`);
  };

  const renderDish = (dish: any, index: number) => {
    return (
      <Col span={12} key={index}>
        <Row className="dish_col">
          <Col span={6}>
            <Image
              width={'100%'}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="dishImage"
            />
          </Col>
          <Col className="dish_detail" span={18}>
            <Row justify={'space-between'}>
              <Col className="title-sm">{dish.name}</Col>
              <Col className="dish_price">{formatPrice(dish.price)} VND</Col>
            </Row>
            <Row>{dish.description}</Row>
          </Col>
        </Row>
      </Col>
    );
  };

  const renderMenuTab = (menu: any, index: number) => {
    return (
      <Col
        className={`menu_tab ${selectMenuIndex === index && 'select_tab'}`}
        onClick={() => setSelectMenuIndex(index)}
        span={24}
        key={index}
      >
        {/* <div
          className="active_tab"
          style={{ display: tabIndex === index ? 'block' : 'none' }}
        ></div> */}
        {menu.name}
      </Col>
    );
  };

  return (
    <div className="menu_container">
      <Row className="container_header" justify={'space-between'}>
        <Col>Danh sách nhóm thực đơn</Col>
        <Col>
          <Row gutter={12}>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={'end'}
                onClick={() => setVisible({ addDishGroupModal: true })}
              >
                Thêm nhóm thực đơn
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={'end'}
                onClick={() => setVisible({ addDishModal: true })}
              >
                Thêm nhóm món ăn
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Content className="container_content">
        <Row justify={'space-around'} gutter={[12, 0]} className="contents">
          <Col
            className="menu_list"
            lg={{ span: 6 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
          >
            <Row>
              {menuList.map((item, index) => renderMenuTab(item, index))}
            </Row>
          </Col>
          <Col
            className="dish_container"
            lg={{ span: 18 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
          >
            <Row className="dish_list" gutter={[12, 12]}>
              {menuListData.dishes?.map((item, index) =>
                renderDish(item, index),
              )}
            </Row>
          </Col>
        </Row>
      </Content>
      <AddDishGroupModal
        visible={visible.addDishGroupModal}
        onSubmit={() => setVisible({ addDishGroupModal: false })}
        onCancel={() => setVisible({ addDishGroupModal: false })}
      />
      <AddDishModal
        visible={visible.addDishModal}
        onSubmit={() => setVisible({ addDishModal: false })}
        onCancel={() => setVisible({ addDishModal: false })}
      />
    </div>
  );
};

export default withAuth(MenuList);
