import Link from 'next/link';
import { api } from '@/lib/api';
import { cn, formatDate } from '@/lib/utils';
import { Briefcase, GraduationCap, Award, Calendar, Download } from 'lucide-react';
import styles from './About.module.css';

export const metadata = {
    title: 'About | Rasheed Babatunde',
    description: 'My professional journey, experience, and education.',
};

export default async function AboutPage() {
    let profile = null;
    let experience = [];
    let education = [];
    let certifications = [];

    try {
        const results = await Promise.all([
            api.getProfile().catch(() => null),
            api.getExperience().catch(() => []),
            api.getEducation().catch(() => []),
            api.getCertifications().catch(() => [])
        ]);

        profile = results[0];
        experience = results[1] || [];
        education = results[2] || [];
        certifications = results[3] || [];
    } catch (error) {
        console.error("Failed to fetch about data", error);
    }

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className={cn('container', styles.container)}>

                {/* Bio Section */}
                <section className={styles.introSection}>
                    <div className={styles.introHeader}>
                        <h1 className={styles.title}>
                            About <span className="text-gradient">Me</span>
                        </h1>
                        {profile?.resume && (
                            <a href={profile.resume} className={styles.resumeButton} target="_blank" rel="noopener noreferrer">
                                <Download size={18} /> Resume
                            </a>
                        )}
                    </div>

                    <div className={styles.bio}>
                        {profile?.bio_long ? (
                            profile.bio_long.split('\n').map((para, i) => (
                                <p key={i} className={styles.para}>{para}</p>
                            ))
                        ) : (
                            <p className={styles.para}>{profile?.bio_short}</p>
                        )}
                    </div>
                </section>

                {/* Experience Section */}
                {experience.length > 0 && (
                    <section className={styles.timelineSection}>
                        <h2 className={styles.sectionTitle}>
                            <Briefcase className="text-primary" /> Experience
                        </h2>

                        <div className={styles.timeline}>
                            {experience.map((job) => (
                                <div key={job.id} className={styles.timelineItem}>
                                    <div className={styles.timelineMarker} />
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineHeader}>
                                            <h3 className={styles.role}>{job.role}</h3>
                                            <span className={styles.company}>{job.company}</span>
                                        </div>

                                        <div className={styles.meta}>
                                            <span className={styles.duration}>
                                                <Calendar size={14} />
                                                {formatDate(job.start_date)} — {job.end_date ? formatDate(job.end_date) : 'Present'}
                                            </span>
                                            <span className={styles.location}>{job.location}</span>
                                        </div>

                                        <p className={styles.description}>{job.description}</p>

                                        {job.achievements && job.achievements.length > 0 && (
                                            <ul className={styles.achievements}>
                                                {job.achievements.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                    <section className={styles.timelineSection}>
                        <h2 className={styles.sectionTitle}>
                            <GraduationCap className="text-primary" /> Education
                        </h2>

                        <div className={styles.grid}>
                            {education.map((edu) => (
                                <div key={edu.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.school}>{edu.institution}</h3>
                                        <span className={styles.degree}>{edu.degree}</span>
                                    </div>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.duration}>
                                            {formatDate(edu.start_date)} — {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                                        </span>
                                    </div>
                                    {edu.description && <p className={styles.cardDescription}>{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {certifications.length > 0 && (
                    <section className={styles.timelineSection}>
                        <h2 className={styles.sectionTitle}>
                            <Award className="text-primary" /> Certifications
                        </h2>

                        <div className={styles.grid}>
                            {certifications.map((cert) => (
                                <div key={cert.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.certName}>{cert.name}</h3>
                                        <span className={styles.issuer}>{cert.issuer}</span>
                                    </div>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.duration}>
                                            Issued {formatDate(cert.date_acquired)}
                                        </span>
                                    </div>
                                    {cert.credential_url && (
                                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                                            View Credential
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}
