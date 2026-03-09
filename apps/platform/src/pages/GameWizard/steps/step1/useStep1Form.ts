import { useState } from 'react';
import type { WizardData } from '../../GameWizard';

export interface FieldErrors {
    title?: string;
    topic?: string;
}

export function useStep1Form(data: WizardData) {
    const [errors, setErrors] = useState<FieldErrors>({});

    const isComplete =
        data.title.trim() !== '' &&
        data.subject !== '' &&
        data.topic.trim() !== '' &&
        data.ageGroup !== '';

    function validate(): boolean {
        const next: FieldErrors = {};
        if (data.title.trim().length < 3) next.title = 'Title must be at least 3 characters.';
        if (data.topic.trim().length < 5) next.topic = 'Topic must be at least 5 characters.';
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    function clearError(field: keyof FieldErrors) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    return { errors, isComplete, validate, clearError };
}