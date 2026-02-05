import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import styles from './FeaturedProjects.module.css';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';
import { Project } from '@/lib/types';

export default async function FeaturedProjects() {
    let projects: Project[] = [];

    try {
        projects = await api.getFeaturedProjects();
    } catch (error) {
        console.error("Failed to fetch featured projects", error);
    }

    if (!projects || projects.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className={cn('container', styles.container)}>
                <div className={styles.header}>
                    <FadeIn direction="right">
                        <h2 className={styles.heading}>
                            Selected <span className="text-gradient">Works</span>
                        </h2>
                    </FadeIn>
                    <FadeIn direction="left">
                        <Link href="/projects" className={styles.viewAll}>
                            View All Projects <ArrowUpRight size={16} />
                        </Link>
                    </FadeIn>
                </div>

                <StaggerContainer className={styles.grid}>
                    {projects.map((project) => (
                        <StaggerItem key={project.id} className="h-full">
                            <Link href={`/projects/${project.slug}`} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    {/* Fallback color if no thumbnail, or use Next Image if configured */}
                                    {project.thumbnail ? (
                                        <img src={project.thumbnail} alt={project.title} className={styles.image} />
                                    ) : (
                                        <div className={styles.placeholderImage} />
                                    )}
                                    <div className={styles.overlay} />
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.tags}>
                                        {project.category && (
                                            <span className={styles.category}>{project.category.name}</span>
                                        )}
                                    </div>

                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.tagline}>{project.tagline}</p>

                                    <div className={styles.techStack}>
                                        {project.tech_stack?.slice(0, 4).map((tech) => (
                                            <span key={tech.id} className={styles.techBadge}>
                                                {tech.name}
                                            </span>
                                        ))}
                                        {project.tech_stack?.length > 4 && (
                                            <span className={styles.techBadge}>+{project.tech_stack.length - 4}</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
