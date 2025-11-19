import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PillNavigation.css';

interface NavItem {
    path: string;
    label: string;
}

const navItems: NavItem[] = [
    { path: '/home', label: 'Home' },
    { path: '/worldmap', label: 'World Map' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/flash-card', label: 'Flash Card' },
    { path: '/stack', label: 'Stack' },
];

interface NavPillProps {
    path: string;
    label: string;
    isActive: boolean;
}

const NavPill: React.FC<NavPillProps> = ({ path, label, isActive }) => {
    return (
        <Link
            to={path}
            className={`nav-pill ${isActive ? 'active' : 'inactive'}`}
        >
            <motion.span
                initial={false}
                animate={{
                    scale: isActive ? 1 : 1,
                }}
                whileHover={{
                    scale: 1.05,
                }}
                transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                }}
            >
                {label}
            </motion.span>
        </Link>
    );
};

export const PillNavigation: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        // Handle both /home and / as home
        if (path === '/home') {
            return location.pathname === '/home' || location.pathname === '/';
        }
        return location.pathname === path;
    };

    return (
        <nav className="pill-nav">
            <div className="pill-nav-container">
                {navItems.map((item) => (
                    <NavPill
                        key={item.path}
                        path={item.path}
                        label={item.label}
                        isActive={isActive(item.path)}
                    />
                ))}
            </div>
        </nav>
    );
};

export default PillNavigation;
