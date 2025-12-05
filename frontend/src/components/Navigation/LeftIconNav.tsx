import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Map,
  CreditCard,
  Beaker,
  Dumbbell,
  Trophy,
  Target,
  User,
  MoreHorizontal,
  LucideIcon
} from 'lucide-react';
import './LeftIconNav.css';

interface NavItem {
  id: string;
  path: string;
  icon: LucideIcon;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', path: '/', icon: Home, label: 'Home' },
  { id: 'worldmap', path: '/world-map', icon: Map, label: 'World Map' },
  { id: 'flashcard', path: '/flash-card', icon: CreditCard, label: 'Flash Card' },
  { id: 'playground', path: '/playground', icon: Beaker, label: 'Playground' },
  { id: 'practice', path: '/practice', icon: Dumbbell, label: 'Practice' },
  { id: 'leaderboards', path: '/leaderboards', icon: Trophy, label: 'Leaderboards' },
  { id: 'quests', path: '/quests', icon: Target, label: 'Quests' },
  { id: 'profile', path: '/profile', icon: User, label: 'Profile' },
  { id: 'more', path: '/more', icon: MoreHorizontal, label: 'More' }
];

export const LeftIconNav: React.FC = () => {
  return (
    <nav className="left-icon-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          data-tooltip={item.label}
        >
          <item.icon size={24} />
        </NavLink>
      ))}
    </nav>
  );
};
