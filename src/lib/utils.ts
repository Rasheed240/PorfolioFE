import { type ClassValue, clsx } from 'clsx';

/**
 * Utility to conditionally join classNames.
 */
export function cn(...inputs: ClassValue[]) {
    // If not using tailwind, twMerge might be overkill but safe
    // For vanilla CSS modules, just clsx is fine, but cn() is a common pattern.
    return clsx(inputs);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date: string | Date | null | undefined) {
    if (!date) return '';

    const d = new Date(date);
    // Check for invalid date
    if (isNaN(d.getTime())) {
        return String(date);
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(d);
}
