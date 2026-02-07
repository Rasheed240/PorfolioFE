'use client';

import { useState, ReactNode, cloneElement, isValidElement } from 'react';
import { ResumeViewer } from './ResumeViewer';

interface ResumePopupProps {
    resumeUrl: string;
    children: ReactNode;
}

export function ResumePopup({ resumeUrl, children }: ResumePopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Clone the child element and add onClick handler
    const childElement = isValidElement(children)
        ? cloneElement(children as any, {
            onClick: () => setIsOpen(true),
        })
        : children;

    return (
        <>
            {childElement}
            <ResumeViewer
                resumeUrl={resumeUrl}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
