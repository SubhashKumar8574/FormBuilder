import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Simple theme switcher component
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button onClick={toggleTheme} className="theme-switcher" title="Toggle Theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Form Builder
        </NavLink>
        
        {/* Hamburger Menu Button (visible on mobile only) */}
        <div className="hamburger-container">
          <button onClick={toggleMenu} className="hamburger-btn" aria-label="Toggle navigation menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links and Theme Switcher */}
        <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="navbar-nav">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/forms" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Forms
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/builder" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Builder
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/analytics" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/preview" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Preview
              </NavLink>
            </li>
          </ul>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;