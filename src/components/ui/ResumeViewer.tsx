'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import styles from './ResumeViewer.module.css';

interface ResumeViewerProps {
    resumeUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

const FALLBACK_RESUME_URL = '/resume.pdf';

export function ResumeViewer({ resumeUrl, isOpen, onClose }: ResumeViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [currentUrl, setCurrentUrl] = useState(resumeUrl);
    const [useFallback, setUseFallback] = useState(false);

    // Check if the primary URL is accessible
    useEffect(() => {
        if (!isOpen) return;

        const checkUrl = async () => {
            try {
                const response = await fetch(resumeUrl, { method: 'HEAD' });
                if (!response.ok) {
                    console.warn(`Resume URL returned ${response.status}, using fallback: ${FALLBACK_RESUME_URL}`);
                    setCurrentUrl(FALLBACK_RESUME_URL);
                    setUseFallback(true);
                }
            } catch (error) {
                console.warn('Failed to access resume URL, using fallback:', error);
                setCurrentUrl(FALLBACK_RESUME_URL);
                setUseFallback(true);
            }
        };

        checkUrl();
    }, [isOpen, resumeUrl]);

    if (!isOpen) return null;

    const handleDownload = async () => {
        try {
            const response = await fetch(currentUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Failed to download resume:', error);
            alert('Failed to download resume. Please try again.');
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleIframeError = () => {
        console.warn('iframe failed to load, trying fallback');
        if (!useFallback) {
            setCurrentUrl(FALLBACK_RESUME_URL);
            setUseFallback(true);
            setIsLoading(true);
        } else {
            setIsLoading(false);
            alert('Failed to load resume. Please try downloading instead.');
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>Resume</h2>
                    <div className={styles.actions}>
                        <button
                            onClick={handleDownload}
                            className={styles.downloadBtn}
                            title="Download resume"
                            aria-label="Download resume"
                        >
                            <Download size={20} />
                            Download
                        </button>
                        <button
                            onClick={onClose}
                            className={styles.closeBtn}
                            title="Close"
                            aria-label="Close resume viewer"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className={styles.container}>
                    {isLoading && (
                        <div className={styles.loading}>
                            <p>Loading resume...</p>
                        </div>
                    )}
                    <iframe
                        src={`${currentUrl}#toolbar=1&navpanes=0`}
                        className={styles.iframe}
                        onLoad={() => setIsLoading(false)}
                        onError={handleIframeError}
                        title="Resume PDF Viewer"
                    />
                </div>
            </div>
        </div>
    );
}
