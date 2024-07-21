'use client';
import { Row } from 'antd';
import './styles.scss';
import withAuth from '@/components/withAuth';
import { Content } from 'antd/es/layout/layout';

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

const menuList = [
    {
        "id": 1,
        "createdAt": "2024-07-06T06:50:36.497Z",
        "updatedAt": "2024-07-06T06:50:36.497Z",
        "restaurantId": "0e21b496-6ebc-4045-bf61-665dc990114d",
        "name": "Noodles",
        "dishlist": [
            {
                "id": 1,
                "createdAt": "2024-07-06T06:50:42.464Z",
                "updatedAt": "2024-07-06T06:50:42.464Z",
                "dishGroupId": 1,
                "name": "Phở",
                "description": "Phở bò Việt Nam",
                "price": 50000,
                "status": 1
            }
        ]
    }
]

const listDetail = [
    {
        "id": 1,
        "createdAt": "2024-07-06T06:50:42.464Z",
        "updatedAt": "2024-07-06T06:50:42.464Z",
        "dishGroupId": 1,
        "name": "Phở",
        "description": "Phở bò Việt Nam",
        "price": 50000,
        "status": 1
    }
]

const MenuList = () => {

    return (
        <div className='menu_container'>
            <Row className='conatiner_header'>Danh sách nhóm thực đơn</Row>
            <Content className='container_content'>
                <Row className='menu_list' gutter={8}>

                </Row>
            </Content>
        </div>
    );
};

export default withAuth(MenuList);
