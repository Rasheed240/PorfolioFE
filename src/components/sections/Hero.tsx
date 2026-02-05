import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowRight, Download } from 'lucide-react';
import styles from './Hero.module.css';
import { FadeIn, TextReveal } from '@/components/ui/Motion';

export default async function Hero() {
    let profile = null;

    try {
        profile = await api.getProfile();
    } catch (error) {
        console.error("Failed to fetch profile for Hero", error);
    }

    if (!profile) {
        return <section className={styles.heroSection}>Loading...</section>;
    }

    return (
        <section className={styles.heroSection}>
            <div className={styles.glowBackground} aria-hidden="true" />

            <div className={cn('container', styles.container)}>
                <div className={styles.content}>
                    <FadeIn direction="down" delay={0.1}>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot} />
                            Available for hire
                        </div>
                    </FadeIn>

                    <h1 className={styles.title}>
                        <TextReveal text={`Hi, I'm ${profile.full_name.split(' ')[0]}.`} className="justify-center" />
                        <FadeIn delay={0.8}>
                            I build <span className="text-gradient">{profile.title}</span>.
                        </FadeIn>
                    </h1>

                    <FadeIn delay={1.0}>
                        <p className={styles.description}>
                            {profile.tagline}
                        </p>
                    </FadeIn>

                    <FadeIn delay={1.2}>
                        <div className={styles.actions}>
                            <Link href="/projects" className={styles.buttonPrimary}>
                                View My Work
                                <ArrowRight size={18} />
                            </Link>

                            {profile.resume && (
                                <a
                                    href={profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.buttonOutline}
                                >
                                    Download Resume
                                    <Download size={18} />
                                </a>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
