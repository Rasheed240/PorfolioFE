import Link from 'next/link';
import { api } from '@/lib/api';
import { cn, formatDate } from '@/lib/utils';
import { ArrowLeft, Github, Globe, Calendar } from 'lucide-react';
import styles from './ProjectDetail.module.css';

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props) {
    try {
        const { slug } = await params;
        const project = await api.getProject(slug);
        return {
            title: `${project.title} | Rasheed Babatunde`,
            description: project.description_short,
        };
    } catch (error) {
        return {
            title: 'Project Not Found',
        };
    }
}

export default async function ProjectDetail({ params }: Props) {
    const { slug } = await params;
    let project = null;

    try {
        project = await api.getProject(slug);
    } catch (error) {
        console.error("Failed to fetch project", error);
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/projects" className="text-primary hover:underline">
                        Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Hero Header */}
            <div className={styles.header}>
                <div className={cn('container', styles.headerContent)}>
                    <Link href="/projects" className={styles.backLink}>
                        <ArrowLeft size={16} /> All Projects
                    </Link>

                    <div className={styles.titleWrapper}>
                        <div className={styles.meta}>
                            {project.category && (
                                <span className={styles.category}>{project.category.name}</span>
                            )}
                        </div>
                        <h1 className={styles.title}>{project.title}</h1>
                        <p className={styles.tagline}>{project.tagline}</p>
                    </div>

                    <div className={styles.links}>
                        {project.live_url && (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                                <Globe size={18} /> Visit Live Site
                            </a>
                        )}
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
                                <Github size={18} /> View Source
                            </a>
                        )}
                    </div>
                </div>

                <div className={styles.backgroundBlur} />
            </div>

            <div className={cn('container', styles.mainContent)}>
                {/* Gallery / Media */}
                {project.media_items && project.media_items.length > 0 && (
                    <div className={styles.gallery}>
                        {project.media_items.map((media) => (
                            <div key={media.id} className={styles.mediaItem}>
                                {media.media_type === 'image' && (
                                    <img src={media.url} alt={media.caption || project.title} className={styles.mediaImage} />
                                )}
                                {media.media_type === 'video' && (
                                    <video
                                        src={media.url}
                                        controls
                                        preload="metadata"
                                        poster={media.poster_url || undefined}
                                        className={styles.mediaVideo}
                                    />
                                )}
                                {/* Handle embeds/docs if needed */}
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.grid}>
                    <div className={styles.leftColumn}>
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p className={styles.description}>{project.description_short}</p>

                            <div className={styles.longDescription}>
                                {/* Ideally process markdown here */}
                                {project.description_long?.split('\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div className={styles.sidebarCard}>
                            <h3 className={styles.sidebarTitle}>Tech Stack</h3>
                            <div className={styles.techList}>
                                {project.tech_stack?.map((tech) => (
                                    <div key={tech.id} className={styles.techItem}>
                                        {tech.skill_icon && <img src={tech.skill_icon} alt="" className="w-5 h-5 object-contain" />}
                                        <span>{tech.display_name}</span>
                                        {tech.role && <span className={styles.techRole}>{tech.role}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
