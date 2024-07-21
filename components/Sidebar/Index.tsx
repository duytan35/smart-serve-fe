'use client';
import React, { useState } from 'react';
import { AlignJustify } from 'lucide-react';
import { Col, Row } from 'antd';
import sidebarNavigate from "../../contants/sidebar"

import "./styles.scss"
import { useRouter } from 'next/router';

type SidebarNavItem = {
    name: string;
    icon: JSX.Element;
    path: string;
};

const Sidebar = () => {

    const [sidebarIndex, setSidebarIndex] = useState(0)
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);  // Use router.push to navigate
    };

    const renderNavIcon = (item: SidebarNavItem, key: number) => {
        return (
            <Col
                span={24}
                className='nav_item'
                onClick={() => handleNavigation(item.path)}
                key={key}
            >
                {item.icon}
            </Col>
        );
    };

    return (
        <div className='sidebar_container'>
            <div className="sidebar_header">
                <AlignJustify />
            </div>
            <Row gutter={[0, 12]} className='icon_container'>
                {sidebarNavigate.map((item, key) => {
                    return (
                        renderNavIcon(item, key)
                    )
                })}
            </Row>
        </div>
    );
};

export default Sidebar;
