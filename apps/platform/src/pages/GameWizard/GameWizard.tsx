import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardShell } from './WizardShell';
import { Step1Domain } from './steps/Step1Domain';
import { Step2Mechanic } from './steps/Step2Mechanic';
import { Step3Questions } from './steps/Step3Questions';
import { Step4Review } from './steps/Step4Review';
import type { GameMechanic, SubjectDomain, AgeGroup } from '@michiko/types';

export interface WizardData {
    title: string;
    subject: SubjectDomain | '';
    topic: string;
    ageGroup: AgeGroup | '';
    mechanic: GameMechanic | '';
    theme: 'EduVerse' | 'ChronoWorld' | 'NexusAcademy' | '';
    questionCount: number;
    questionTypes: string[];
}

const INITIAL: WizardData = {
    title: '',
    subject: '',
    topic: '',
    ageGroup: '',
    mechanic: '',
    theme: '',
    questionCount: 10,
    questionTypes: ['multiple-choice'],
};

const STEPS = ['Domain', 'Mechanic', 'Questions', 'Review'];

export default function GameWizard() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<WizardData>(INITIAL);
    const navigate = useNavigate();

    function update(patch: Partial<WizardData>) {
        setData(prev => ({ ...prev, ...patch }));
    }

    function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)); }
    function back() { setStep(s => Math.max(s - 1, 0)); }

    function handleSubmit() {
        // Pass wizard data to blueprint generation via route state
        navigate('/blueprint/generating', { state: { wizardData: data } });
    }

    const stepProps = { data, update, onNext: next, onBack: back };

    return (
        <WizardShell steps={STEPS} current={step} onClose={() => navigate('/')}>
            {step === 0 && <Step1Domain {...stepProps} />}
            {step === 1 && <Step2Mechanic {...stepProps} />}
            {step === 2 && <Step3Questions {...stepProps} />}
            {step === 3 && <Step4Review {...stepProps} onSubmit={handleSubmit} />}
        </WizardShell>
    );
}