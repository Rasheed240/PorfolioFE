export interface MediaItem {
    id: string;
    type: 'image' | 'video' | 'document' | 'embed';
    url: string;
    thumbnail: string | null;
    caption: string;
}

export interface SocialLink {
    id: string;
    platform: string;
    label: string;
    url: string;
    icon?: string;
}

export interface Profile {
    id: string;
    full_name: string;
    title: string;
    tagline: string;
    bio_short: string;
    bio_long: string;
    avatar_url: string | null;
    resume_url: string | null;
    social_links: SocialLink[];
}

export interface Skill {
    id: string;
    name: string;
    proficiency: number;
    icon_url: string | null;
    is_featured: boolean;
}

export interface SkillGroup {
    id: string;
    name: string;
    icon_class: string;
    skills: Skill[];
}

export interface ProjectTech {
    id: string;
    name: string;
    icon_url: string | null;
}

export interface ProjectCategory {
    id: string;
    name: string;
    slug: string;
}

export interface Project {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    description_short: string;
    description_long: string;
    thumbnail: string | null;
    github_url: string;
    live_url: string;
    tech_stack: ProjectTech[];
    category: ProjectCategory;
    media_items?: MediaItem[];
    is_featured: boolean;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    achievements: string[];
    location: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date_acquired: string;
    credential_url: string | null;
}

export interface Section {
    identifier: string;
    title: string;
    subtitle: string;
    content: string;
    cta_text: string;
    cta_url: string;
}

export interface FooterLink {
    id: string;
    label: string;
    url: string;
    column: string;
    is_external: boolean;
}

export interface SiteSettings {
    site_title: string;
    site_description: string;
    og_image: string | null;
    contact_email: string;
}
