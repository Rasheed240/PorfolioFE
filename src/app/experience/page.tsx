import Link from 'next/link';
import { api } from '@/lib/api';
import { cn, formatDate } from '@/lib/utils';
import { Briefcase, Calendar } from 'lucide-react';
import styles from './Experience.module.css';

export const metadata = {
    title: 'Experience | Rasheed Babatunde',
    description: 'My career history and professional experience.',
};

export default async function ExperiencePage() {
    let experience = [];

    try {
        experience = await api.getExperience().catch(() => []);
    } catch (error) {
        console.error("Failed to fetch experience", error);
    }

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className={cn('container', styles.container)}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Professional <span className="text-gradient">Experience</span>
                    </h1>
                    <p className={styles.subtitle}>
                        A timeline of my professional career and contributions.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {experience.map((job) => (
                        <div key={job.id} className={styles.timelineItem}>
                            <div className={styles.timelineMarker} />

                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.primaryInfo}>
                                        <h2 className={styles.role}>{job.role}</h2>
                                        <span className={styles.company}>{job.company}</span>
                                    </div>
                                    <div className={styles.meta}>
                                        <span className={styles.duration}>
                                            <Calendar size={14} />
                                            {formatDate(job.start_date)} — {job.end_date ? formatDate(job.end_date) : 'Present'}
                                        </span>
                                        <span className={styles.location}>{job.location}</span>
                                    </div>
                                </div>

                                <div className={styles.content}>
                                    <p className={styles.description}>{job.description}</p>

                                    {job.achievements && job.achievements.length > 0 && (
                                        <div className={styles.achievements}>
                                            <h4 className={styles.achievementsTitle}>Key Achievements:</h4>
                                            <ul className={styles.list}>
                                                {job.achievements.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <Link href="/about" className={styles.link}>View Full Bio and Education</Link>
                </div>
            </div>
        </main>
    );
}
