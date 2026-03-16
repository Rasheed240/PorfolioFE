'use client';

import { useState, ReactNode, cloneElement, isValidElement, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ResumeViewer } from './ResumeViewer';
import styles from './ResumePassphrase.module.css';

const PASSPHRASE = '31012000';

interface ResumePopupProps {
    resumeUrl: string;
    children: ReactNode;
}

export function ResumePopup({ resumeUrl, children }: ResumePopupProps) {
    const [gateOpen, setGateOpen] = useState(false);
    const [viewerOpen, setViewerOpen] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (gateOpen) {
            setInput('');
            setError('');
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [gateOpen]);

    const handleOpen = () => setGateOpen(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === PASSPHRASE) {
            setGateOpen(false);
            setViewerOpen(true);
        } else {
            setError('Incorrect passphrase. Please try again or contact me directly.');
            setInput('');
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setGateOpen(false);
        }
    };

    const childElement = isValidElement(children)
        ? cloneElement(children as any, { onClick: handleOpen })
        : children;

    return (
        <>
            {childElement}

            {/* Passphrase gate */}
            {gateOpen && (
                <div className={styles.backdrop} onClick={handleBackdropClick}>
                    <div className={styles.modal}>
                        <h2 className={styles.title}>Access Resume</h2>
                        <p className={styles.subtitle}>
                            This resume is protected. Enter the passphrase to view it, or{' '}
                            <Link href="/contact" className={styles.contactLink} onClick={() => setGateOpen(false)}>
                                contact me
                            </Link>{' '}
                            to request access.
                        </p>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <input
                                ref={inputRef}
                                type="password"
                                value={input}
                                onChange={(e) => { setInput(e.target.value); setError(''); }}
                                placeholder="Enter passphrase"
                                className={styles.input}
                                autoComplete="off"
                            />
                            {error && <p className={styles.error}>{error}</p>}
                            <div className={styles.buttons}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setGateOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    View Resume
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ResumeViewer
                resumeUrl={resumeUrl}
                isOpen={viewerOpen}
                onClose={() => setViewerOpen(false)}
            />
        </>
    );
}
