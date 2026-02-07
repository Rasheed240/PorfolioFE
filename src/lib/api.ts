import {
    Profile,
    SkillGroup,
    Project,
    Experience,
    Education,
    Certification,
    Section,
    SiteSettings,
    FooterLink,
    Skill
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}, retries = 3, backoff = 300): Promise<T> {
    // Use revalidation by default (1 hour)
    const defaultOptions: RequestInit = {
        next: { revalidate: 3600 },
        ...options,
    };

    try {
        const res = await fetch(`${API_URL}${endpoint}`, defaultOptions);

        if (!res.ok) {
            // If it's a server error (5xx) or rate limit (429), we might want to retry
            if (retries > 0 && (res.status >= 500 || res.status === 429)) {
                console.warn(`API Error ${res.status} at ${endpoint}. Retrying in ${backoff}ms...`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                return fetchAPI<T>(endpoint, options, retries - 1, backoff * 2);
            }

            console.error(`API Error: ${res.status} ${res.statusText} at ${endpoint}`);
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }

        return res.json();
    } catch (error) {
        // Network errors (fetch failed) are also worth retrying
        if (retries > 0) {
            console.warn(`Fetch failed for ${endpoint}. Retrying in ${backoff}ms...`, error);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchAPI<T>(endpoint, options, retries - 1, backoff * 2);
        }

        console.error(`Fetch failed for ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    getProfile: () => fetchAPI<Profile>('/identity/profile/'),

    getSettings: () => fetchAPI<SiteSettings>('/content/settings/'),

    getSection: (identifier: string) => fetchAPI<Section>(`/content/sections/${identifier}/`),

    getSections: () => fetchAPI<Section[]>('/content/sections/'),

    getFooterLinks: () => fetchAPI<{ column: string, links: FooterLink[] }[]>('/content/footer/'),

    getSkills: () => fetchAPI<SkillGroup[]>('/skills/'),

    getFeaturedSkills: () => fetchAPI<Skill[]>('/skills/featured/'),

    getProjects: () => fetchAPI<{ count: number, results: Project[] }>('/projects/'),

    getFeaturedProjects: () => fetchAPI<Project[]>('/projects/featured/'),

    getProject: (slug: string) => fetchAPI<Project>(`/projects/${slug}/`),

    getExperience: () => fetchAPI<Experience[]>('/experience/'),

    getEducation: () => fetchAPI<Education[]>('/experience/education/'),

    getCertifications: () => fetchAPI<Certification[]>('/experience/certifications/'),
};
