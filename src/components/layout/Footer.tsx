import Link from 'next/link';
import { FooterLink, SocialLink } from '@/lib/types';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

const IconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    website: Globe,
    twitter: Twitter,
    x: Twitter
};

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    let footerGroups: { column: string, links: FooterLink[] }[] = [];
    let socialLinks: SocialLink[] = [];

    try {
        const [groupsData, profileData] = await Promise.all([
            api.getFooterLinks().catch(() => []),
            api.getProfile().catch(() => null)
        ]);

        footerGroups = groupsData || [];
        socialLinks = profileData?.social_links || [];
    } catch (error) {
        console.error("Failed to fetch footer data", error);
    }

    // Debug (temporary)
    // console.log("Footer groups:", footerGroups);
    // console.log("Social links:", socialLinks);

    return (
        <footer className={styles.footer}>
            <div className={cn('container', styles.container)}>
                <div className={styles.topSection}>
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.logo}>
                            <span className="text-gradient font-bold text-xl">Portfolio</span>
                        </Link>
                        <p className={styles.tagline}>
                            Building digital experiences with passion and precision.
                        </p>
                        <div className={styles.socials}>
                            {socialLinks.map((link) => {
                                const Icon = IconMap[link.platform.toLowerCase()] || Globe;
                                return (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                        aria-label={link.label}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.linksGrid}>
                        {footerGroups.map((group, idx) => (
                            <div key={idx} className={styles.linkGroup}>
                                <h3 className={styles.groupTitle}>{group.column}</h3>
                                <ul className={styles.linkList}>
                                    {group.links.map((link) => (
                                        <li key={link.id}>
                                            <a
                                                href={link.url}
                                                target={link.is_external ? "_blank" : undefined}
                                                className={styles.link}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {currentYear} Rasheed Babatunde. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
