import React from 'react';
import Link from 'next/link';
import "./styles.scss"

const Header = () => {
    return (
        <header className='header_container'>
            <div className="restaurant_name title-md">Duy Tân Restaurant</div>
            {/* <nav>
                <ul>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/sign-in">Logout</Link>
                    </li>
                </ul>
            </nav> */}
        </header>
    );
};

export default Header;
