import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import styles from './Projects.module.css';
import { Project } from '@/lib/types';

export const metadata = {
    title: 'Projects | Rasheed Babatunde',
    description: 'A collection of my software engineering projects and case studies.',
};

export default async function ProjectsPage() {
    let projects: Project[] = [];

    try {
        const data = await api.getProjects();
        projects = data.results || [];
    } catch (error) {
        console.error("Failed to fetch projects", error);
    }

    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className={cn('container', styles.container)}>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        All <span className="text-gradient">Projects</span> ({projects.length})
                    </h1>
                    <p className={styles.subtitle}>
                        A comprehensive list of my open-source contributions, client work, and experiments.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FolderGit2 size={48} className="text-muted-foreground mb-4" />
                        <p>No projects found yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {projects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt={project.title} className={styles.image} />
                                    ) : (
                                        <div className={styles.placeholderImage} />
                                    )}
                                </div>

                                <div className={styles.content}>
                                    <div className={styles.meta}>
                                        {project.category && (
                                            <span className={styles.category}>{project.category.name}</span>
                                        )}
                                        <span className={styles.date}>{new Date().getFullYear()}</span> {/* Ideally create_date */}
                                    </div>

                                    <h2 className={styles.projectTitle}>{project.title}</h2>
                                    <p className={styles.tagline}>{project.tagline}</p>

                                    <p className={styles.description}>{project.description_short}</p>

                                    <div className={styles.footer}>
                                        <span className={styles.arrow}><ArrowUpRight size={18} /></span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
