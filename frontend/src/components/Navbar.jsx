import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import './navbar.scss';
import { Menu, X, BrainCircuit, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const onLogout = async () => {
        await handleLogout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo Area */}
                <NavLink to="/" className="navbar__logo">
                    <BrainCircuit size={28} className="text-pink-600" color="#6366F1" />
                    <span className="navbar__logo-text">PrepForge</span>
                </NavLink>

                {/* Desktop Menu */}
                <div className="navbar__menu navbar__menu--desktop">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
                    >
                        Scanner
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
                    >
                        <LayoutDashboard size={18} className="mr-1 inline-block" />
                        Job Board
                    </NavLink>
                    
                    <div className="navbar__auth">
                        {user ? (
                            <button onClick={onLogout} className="btn-logout">
                                <LogOut size={16} /> Logout
                            </button>
                        ) : (
                            <NavLink to="/login" className="btn-login">Sign In</NavLink>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="navbar__mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="navbar__mobile-menu">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Scanner
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <LayoutDashboard size={18} className="mr-2 inline-block" />
                        Job Board
                    </NavLink>

                    <div className="navbar__mobile-auth">
                        {user ? (
                            <button onClick={onLogout} className="btn-logout btn-logout--mobile">
                                <LogOut size={18} className="mr-2" /> Logout
                            </button>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="btn-login btn-login--mobile" 
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
