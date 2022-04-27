import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SideBarItemProps {
  to: string;
  text: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const SideBarItem = ({to, text, onClick, children}:SideBarItemProps) => {
  const location = useLocation();
  function getClassName(itemName: string) {
    return location.pathname === itemName ? 'nav-item active' : 'nav-item';
  }
  return (
    <li className={getClassName(to)}>
    <Link to={to} className="nav-link" onClick={onClick}>
        <span className="sidebar-icon">
            {children}
        </span>
        <span className="sidebar-text">{text}</span>
    </Link>
</li>
  );
}

export default SideBarItem;