import { BringToFront, House, PieChart, SquareMenu } from 'lucide-react';

// type SidebarNavItem = {
//     name: string;
//     icon: JSX.Element;
//     path: string;
// };

const sidebarNavigate = [
    {
        name: "home",
        icon: <House />,
        path: "/home"
    },
    {
        name: "orderList",
        icon: <BringToFront />,
        path: "/orderList"
    },
    {
        name: "menuList",
        icon: <SquareMenu />,
        path: "/menuList"
    },
    {
        name: "dashboard",
        icon: <PieChart />,
        path: "/dashboard"
    },
];

export default sidebarNavigate;