'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [siteTitle, setSiteTitle] = useState("Rasheed Babatunde | Software Engineer");

    useEffect(() => {
        // Fetch settings from backend API
        api.getSettings()
            .then(data => {
                if (data?.site_title) {
                    setSiteTitle(data.site_title);
                }
            })
            .catch(() => {
                // Silently fail - use default title
            });
    }, []);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Experience', href: '/experience' },
        { label: 'Contact', href: '/contact' },
    ];

    const toggleMenu = () => {
        console.log('Toggle menu, current state:', isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        console.log('Close menu');
        setIsMenuOpen(false);
    };

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Extract first and last name for mobile
    const getShortName = (fullTitle: string) => {
        const parts = fullTitle.split('|')[0].trim().split(' ');
        if (parts.length >= 2) {
            return `${parts[0]} ${parts[parts.length - 1]}`;
        }
        return fullTitle.split('|')[0].trim();
    };

    return (
        <header className={styles.header}>
            <div className={cn('container', styles.container)}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    <span className={styles.logoFull}>{siteTitle}</span>
                    <span className={styles.logoShort}>{getShortName(siteTitle)}</span>
                </Link>

                {/* Hamburger Button */}
                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={cn(styles.hamburgerLine, isMenuOpen && styles.hamburgerLineOpen1)}></span>
                    <span className={cn(styles.hamburgerLine, isMenuOpen && styles.hamburgerLineOpen2)}></span>
                    <span className={cn(styles.hamburgerLine, isMenuOpen && styles.hamburgerLineOpen3)}></span>
                </button>

                {/* Desktop Nav */}
                <nav className={styles.navDesktop}>
                    <ul className={styles.navList}>
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={styles.navLink}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile Menu Overlay - OUTSIDE container */}
            <div
                className={cn(styles.mobileOverlay, isMenuOpen && styles.mobileOverlayOpen)}
                onClick={closeMenu}
            />

            {/* Mobile Nav - OUTSIDE container */}
            <nav className={cn(styles.navMobile, isMenuOpen && styles.navMobileOpen)} style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                maxWidth: '320px',
                height: '100vh',
                zIndex: 100000,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out'
            }}>
                <ul className={styles.navListMobile}>
                    {navLinks.map((link, index) => (
                        <li
                            key={link.href}
                            style={{ animationDelay: `${index * 0.08}s` }}
                            className={styles.navItemMobile}
                        >
                            <Link
                                href={link.href}
                                className={styles.navLinkMobile}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
