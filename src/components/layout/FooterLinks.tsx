'use client';

import { FooterLink } from '@/lib/types';
import { ResumePopup } from '@/components/ui/ResumePopup';
import styles from './Footer.module.css';

interface FooterLinksProps {
    groups: { column: string; links: FooterLink[] }[];
    resumeUrl?: string | null;
}

export function FooterLinks({ groups, resumeUrl }: FooterLinksProps) {
    return (
        <div className={styles.linksGrid}>
            {groups.map((group, idx) => (
                <div key={idx} className={styles.linkGroup}>
                    <h3 className={styles.groupTitle}>{group.column}</h3>
                    <ul className={styles.linkList}>
                        {group.links.map((link) => {
                            // Check if this is a resume link
                            const isResumeLink = 
                                link.label.toLowerCase().includes('resume') && 
                                resumeUrl;

                            if (isResumeLink && resumeUrl) {
                                return (
                                    <li key={link.id}>
                                        <ResumePopup resumeUrl={resumeUrl}>
                                            <a className={styles.link}>
                                                {link.label}
                                            </a>
                                        </ResumePopup>
                                    </li>
                                );
                            }

                            return (
                                <li key={link.id}>
                                    <a
                                        href={link.url}
                                        target={link.is_external ? "_blank" : undefined}
                                        className={styles.link}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
