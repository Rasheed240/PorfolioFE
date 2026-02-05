import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Mail, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import styles from './Contact.module.css';

export const metadata = {
    title: 'Contact | Rasheed Babatunde',
    description: 'Get in touch for opportunities, collaborations, or just to say hi.',
};

const IconMap: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    website: Globe,
    twitter: Twitter,
    x: Twitter
};

export default async function ContactPage() {
    let settings = null;
    let profile = null;

    try {
        const results = await Promise.all([
            api.getSettings().catch(() => null),
            api.getProfile().catch(() => null)
        ]);

        settings = results[0];
        profile = results[1];
    } catch (error) {
        console.error("Failed to fetch contact data", error);
    }

    const socialLinks = profile?.social_links || [];
    const contactEmail = settings?.contact_email || 'hello@example.com';

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className={cn('container', styles.container)}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Get in <span className="text-gradient">Touch</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Have a project in mind or want to discuss a potential collaboration?
                        I'm currently available for freelance work and full-time opportunities.
                    </p>
                </div>

                <div className={styles.content}>
                    <a href={`mailto:${contactEmail}`} className={styles.emailCard}>
                        <div className={styles.iconWrapper}>
                            <Mail size={32} />
                        </div>
                        <h2 className={styles.cardTitle}>Email Me</h2>
                        <p className={styles.emailAddress}>{contactEmail}</p>
                        <span className={styles.cta}>Send an email &toea;</span>
                    </a>

                    <div className={styles.socialGrid}>
                        {socialLinks.map((link) => {
                            const Icon = IconMap[link.platform.toLowerCase()] || Globe;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialCard}
                                >
                                    <Icon size={24} className={styles.socialIcon} />
                                    <span className={styles.socialLabel}>{link.platform}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.formValues}>
                    {/* Detailed form could go here, for now just mailto */}
                    <p className={styles.note}>
                        Prefer social media? Connect with me on the platforms above.
                    </p>
                </div>

            </div>
        </main>
    );
}
