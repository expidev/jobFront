import React from 'react';
import Style from './Menu.module.css';
import { avatar } from '../content/avatar';
import { navbar } from '../content/navbar';

import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
    const location = useLocation();
    
    const isActive = (path) => {
        if (location.pathname === path) {
            return ` ${Style.active}`;
        } else {
            return '';
        }
    }
    const navbars = navbar.map((nav, index) => {
        return (
            <li className={`${Style.navList}${isActive(nav.link)}` } key={index}>
                <Link to={nav.link}>
                    <svg width="30" height="25" xmlns="http://www.w3.org/2000/svg">
                        <path d={nav.svgPath} fill="#ffffff" fillOpacity="0.8"/>
                    </svg>
                    {nav.label}
                </Link>
            </li>
        );
    });

    return (
        <header>
            <img 
                className={Style.profile}
                src={avatar.img}
                alt={"profile"}
            />
            <nav className={Style.nav}>
                <ul className={Style.container}>
                    {navbars}
                </ul>
            </nav>
        </header>
    );
}