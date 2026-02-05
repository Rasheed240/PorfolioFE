import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils'; // wait, I fixed this
import styles from './Navbar.module.css';

export default async function Navbar() {
    let siteTitle = "Portfolio";

    try {
        const settings = await api.getSettings();
        if (settings?.site_title) {
            siteTitle = settings.site_title;
        }
    } catch (e) {
        console.error("Failed to load settings", e);
    }

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Experience', href: '/experience' },
        { label: 'Contact', href: '/contact' },
    ];

    return (
        <header className={styles.header}>
            <div className={cn('container', styles.container)}>
                <Link href="/" className={styles.logo}>
                    <span className="text-gradient font-bold text-xl">{siteTitle}</span>
                </Link>

                <nav className={styles.nav}>
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
        </header>
    );
}
