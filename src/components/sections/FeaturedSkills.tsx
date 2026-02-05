import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import styles from './FeaturedSkills.module.css';

export default async function FeaturedSkills() {
    let skills = [];

    try {
        skills = await api.getFeaturedSkills();
    } catch (error) {
        console.error("Failed to fetch featured skills", error);
    }

    if (!skills || skills.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={cn('container', styles.container)}>
                <h2 className={styles.heading}>
                    Tech <span className="text-gradient">Stack</span>
                </h2>

                <div className={styles.grid}>
                    {skills.map((skill) => (
                        <div key={skill.id} className={styles.skillCard}>
                            {skill.icon_url && (
                                <img src={skill.icon_url} alt="" className={styles.icon} />
                            )}
                            <span className={styles.skillName}>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
