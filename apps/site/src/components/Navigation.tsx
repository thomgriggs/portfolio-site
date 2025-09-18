'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/notes', label: 'Notes' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Skip Navigation Links */}
      <a 
        href="#main-content" 
        className="skip-link"
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className="skip-link skip-link-nav"
      >
        Skip to navigation
      </a>
      
      <nav className="nav" id="navigation" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            <Link href="/" className="nav-logo">
              <span className="nav-logo-text">thomgriggs</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-menu">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button"
              aria-label="Toggle menu"
            >
            <svg
              className="mobile-menu-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="mobile-nav">
              <div className="mobile-nav-content">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mobile-nav-link ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
