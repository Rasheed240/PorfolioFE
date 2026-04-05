'use client';

import { useState, ReactNode, cloneElement, isValidElement, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ResumeViewer } from './ResumeViewer';
import styles from './ResumePassphrase.module.css';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/identity/verify-passphrase/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ passphrase: input }),
            });
            
            if (apiRes.ok) {
                const data = await apiRes.json();
                if (data.valid) {
                    setGateOpen(false);
                    setViewerOpen(true);
                } else {
                    setError('Incorrect passphrase. Please try again or contact me directly.');
                    setInput('');
                }
            } else {
                setError('Incorrect passphrase. Please try again or contact me directly.');
                setInput('');
            }
        } catch (err) {
            setError('Error verifying passphrase. Please try again later.');
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
                            This resume is protected. Enter the passphrase to view it.
                            <br/><br/>
                            <span className="text-sm">Hints: <br/>- Whats my secondary school nickname?<br/>- What is my Date of Birth (DDMMYYYY)?</span>
                            <br/><br/>
                            Otherwise,{' '}
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
