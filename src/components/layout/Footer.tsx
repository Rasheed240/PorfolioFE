import Link from 'next/link';
import { FooterLink, SocialLink } from '@/lib/types';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import styles from './Footer.module.css';
import { FooterLinks } from './FooterLinks';

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
    let resumeUrl: string | null = null;

    try {
        const [groupsData, profileData] = await Promise.all([
            api.getFooterLinks().catch(() => []),
            api.getProfile().catch(() => null)
        ]);

        footerGroups = groupsData || [];
        socialLinks = profileData?.social_links || [];
        resumeUrl = profileData?.resume_url || null;
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

                    <FooterLinks groups={footerGroups} resumeUrl={resumeUrl} />
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
