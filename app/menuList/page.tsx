'use client';
import { Button, Col, Image, Row } from 'antd';
import { useRouter } from 'next/navigation';

import withAuth from '@/components/withAuth';
import { Content } from 'antd/es/layout/layout';
import './styles.scss';
import { formatCurrency } from '@/utils';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import AddDishGroupModal from '@/components/AddDishGroupModal';
import AddDishModal from '@/components/AddDishModal';

import {
  createDishes,
  createDishgroup,
  getDishesByDishGroupId,
  getDishgroup,
} from '../../services/dishes';
import { IDishGroup, IDish } from '@/types/dish';
import { getImage } from '@/services/file';

const MenuList = () => {
  const router = useRouter();
  const [menuList, setMenuList] = useState<IDishGroup[]>([]);
  const [menuListData, setMenuListData] = useState<IDish[]>([]);
  const [selectMenuIndex, setSelectMenuIndex] = useState<number>(0);
  const [visible, setVisible] = useState({
    addDishGroupModal: false,
    addDishModal: false,
  });
  const [loading, setLoading] = useState(false);
  console.log(loading);

  useEffect(() => {
    loadMenuList();
  }, []);

  useEffect(() => {
    loadMenuListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuList, selectMenuIndex]);
  const loadMenuListData = async () => {
    setLoading(true);

    const dishesList = await getDishesByDishGroupId({
      dishGroupId: String(menuList[selectMenuIndex]?.id),
    });
    setMenuListData(dishesList?.data?.data ?? []);
    setLoading(false);
  };

  const loadMenuList = async () => {
    const response = await getDishgroup();

    setMenuList(response?.data?.data ?? []);
    setSelectMenuIndex(0);
  };

  const handleViewDishDetail = (dish: any) => {
    router.push(`/menuList/dishDetail/${dish?.id}`);
  };

  const handleCreateDishGroup = async (name: string) => {
    const response = await createDishgroup({ name: name });
    if (response?.data.success) {
      loadMenuListData();
      setVisible({ ...visible, addDishGroupModal: false });
    }
  };

  const handleCreateDishes = async (formDetail: any, imageIds: string[]) => {
    const formdata = {
      description: formDetail?.description,
      dishGroupId: String(menuList[selectMenuIndex]?.id),
      imageIds: imageIds,
      name: formDetail?.name,
      price: Number(formDetail?.price),
      status: 1,
    };
    console.log(formdata);

    const response = await createDishes({ data: formdata });
    if (response?.data.success) {
      loadMenuList();
      setVisible({ ...visible, addDishModal: false });
    }
  };

  const renderDish = (dish: IDish, index: number) => {
    return (
      <Col
        // span={12}
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        xxl={12}
        className="dish_item"
        key={index}
      >
        <Row className="dish_col">
          <Col span={6}>
            <Image
              // width={'100%'}
              height={'100%'}
              src={
                dish.imageIds.length > 0
                  ? getImage(dish?.imageIds[0])
                  : 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }
              alt="dishImage"
            />
          </Col>
          <Col className="dish_detail" span={18}>
            <Row justify={'space-between'}>
              <Col
                className="title-md"
                onClick={() => {
                  handleViewDishDetail(dish);
                }}
              >
                {dish.name}
              </Col>
              <Col className="dish_price">{formatCurrency(dish.price)} VND</Col>
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
                onClick={() =>
                  setVisible({ ...visible, addDishGroupModal: true })
                }
              >
                Thêm nhóm thực đơn
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                iconPosition={'end'}
                onClick={() => setVisible({ ...visible, addDishModal: true })}
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
              {menuList?.map((item, index) => renderMenuTab(item, index))}
            </Row>
          </Col>
          <Col
            className="dish_container"
            lg={{ span: 18 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
          >
            <Row className="dish_list" gutter={[12, 12]}>
              {menuListData?.map((item, index) => renderDish(item, index))}
            </Row>
          </Col>
        </Row>
      </Content>
      <AddDishGroupModal
        visible={visible.addDishGroupModal}
        onSubmit={handleCreateDishGroup}
        onCancel={() => setVisible({ ...visible, addDishGroupModal: false })}
      />
      <AddDishModal
        dishGroupData={menuListData}
        visible={visible.addDishModal}
        onSubmit={handleCreateDishes}
        onCancel={() => setVisible({ ...visible, addDishModal: false })}
      />
    </div>
  );
};

export default withAuth(MenuList);
