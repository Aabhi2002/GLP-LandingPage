import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle2 } from 'lucide-react';
import { getCategoryExplanation } from './scoring';
import { questionsConfig } from './questionsConfig';
import { TestResult } from './types';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

interface ResultPageProps {
    result: TestResult;
}

export default function ResultPage({ result }: ResultPageProps) {
    const navigate = useNavigate();
    const { totalScore, finalCategory, answers, name, phone, contactRequested } = result;
    const explanation = getCategoryExplanation(finalCategory);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const hasSubmitted = useRef(false);

    useEffect(() => {
        // Auto-submit to Google Sheets when results page loads
        if (!hasSubmitted.current && GOOGLE_SCRIPT_URL) {
            hasSubmitted.current = true;
            submitToGoogleSheets();
        }
    }, []);

    const submitToGoogleSheets = async () => {
        if (!GOOGLE_SCRIPT_URL) {
            setIsSubmitted(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const answersData: Record<string, string> = {};

            questionsConfig.forEach((question) => {
                const answer = answers[question.id];

                if (question.type === "single") {
                    const selectedOption = question.options.find(opt => opt.id === answer);
                    answersData[question.id] = selectedOption ? selectedOption.label : '';
                } else if (question.type === "multi" && Array.isArray(answer)) {
                    const selectedLabels = answer.map(optionId => {
                        const option = question.options.find(opt => opt.id === optionId);
                        return option ? option.label : '';
                    }).filter(Boolean);
                    answersData[question.id] = selectedLabels.join(', ');
                }
            });

            const payload = {
                timestamp: new Date().toISOString(),
                name: name,
                phone: phone,
                ...answersData,
                totalScore: totalScore,
                baseCategory: result.baseCategory,
                finalCategory: finalCategory,
                triggeredFlags: result.triggeredFlags, // Send as array, script will join it
                contactRequested: contactRequested, // Add contact preference
                sheetName: "Sheet1" // Specify Sheet 1 for risk score test data
            };

            // Log payload for debugging
            console.log('Submitting to Google Sheets:', payload);
            console.log('Google Script URL:', GOOGLE_SCRIPT_URL);

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            console.log('Submission complete (no-cors mode - cannot read response)');
            setIsSubmitted(true);
        } catch (err) {
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryColor = () => {
        if (finalCategory.includes('BASE')) return {
            bg: 'bg-green-50',
            border: 'border-green-500',
            text: 'text-green-800',
            icon: '🟢'
        };
        if (finalCategory.includes('TRANSFORM')) return {
            bg: 'bg-orange-50',
            border: 'border-orange-500',
            text: 'text-orange-800',
            icon: '🟡'
        };
        return {
            bg: 'bg-red-50',
            border: 'border-red-500',
            text: 'text-red-800',
            icon: '🔴'
        };
    };

    const colors = getCategoryColor();

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            {/* Back to Home Button */}
            <div className="container mx-auto px-4 pt-6">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </button>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Hero Section */}
                <div className={`${colors.bg} border-4 ${colors.border} rounded-2xl p-8 md:p-12 shadow-xl mb-8`}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                        <div className="text-7xl">{colors.icon}</div>
                        <div>
                            <h1 className={`text-3xl md:text-4xl font-display font-bold ${colors.text} mb-2`}>
                                {explanation.title.replace('🟢 ', '').replace('🟡 ', '').replace('🔴 ', '')}
                            </h1>
                            <div className="flex items-baseline gap-3 justify-center md:justify-start">
                                <span className={`text-5xl font-bold ${colors.text}`}>{totalScore}</span>
                                <span className={`text-lg font-medium ${colors.text} opacity-80`}>points</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analysis Section */}
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200 mb-8">
                    <h2 className="text-2xl font-display font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="text-3xl">📊</span>
                        {explanation.subtitle}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="text-2xl">🔍</span> What This Means
                            </h3>
                            <ul className="space-y-3">
                                {explanation.meaning.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="text-2xl">💪</span> What You Need
                            </h3>
                            <ul className="space-y-3">
                                {explanation.youNeed.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <span className="text-secondary font-bold flex-shrink-0">→</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {explanation.note && (
                        <div className="flex items-start gap-4 p-5 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                            <span className="text-3xl">💡</span>
                            <p className="text-gray-700 leading-relaxed">{explanation.note}</p>
                        </div>
                    )}
                </div>

                {/* Recommended Plan Section */}
                <div className="bg-white rounded-2xl shadow-xl border-4 border-primary overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 p-8 md:p-10 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                            🎯 Your Recommended Action Plan
                        </h2>
                        <p className="text-lg opacity-95">
                            Personalized for your <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">{finalCategory}</span> category
                        </p>
                    </div>

                    <div className="p-6 md:p-10">
                        {finalCategory.includes('BASE') && (
                            <div className="space-y-5">
                                {[
                                    { title: 'Foundation Building', desc: 'Start with gut preparation and establish a solid protein intake routine (1g/kg body weight daily)' },
                                    { title: 'Strength Training Setup', desc: 'Begin basic strength training 2-3x per week to preserve muscle mass during weight loss' },
                                    { title: 'Weekly Monitoring', desc: 'Track your progress weekly to catch any issues early and adjust your approach' }
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-5 p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                <span className="bg-blue-100 text-primary px-3 py-1 rounded-lg">{step.title}</span>
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {finalCategory.includes('TRANSFORM') && (
                            <div className="space-y-5">
                                {[
                                    { title: 'Lean Mass Restoration', desc: 'Implement structured EMS/strength training program to rebuild lost muscle tissue' },
                                    { title: 'Gut & Metabolic Correction', desc: 'Address digestive issues and optimize micronutrient intake for better energy and metabolism' },
                                    { title: 'Body Sculpting & Tightening', desc: 'Focus on targeted exercises and treatments to improve body composition and skin elasticity' },
                                    { title: 'Plateau Breaking Strategy', desc: 'Adjust your approach to overcome weight loss plateaus and continue progress' }
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-5 p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                <span className="bg-blue-100 text-primary px-3 py-1 rounded-lg">{step.title}</span>
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {finalCategory.includes('EXIT') && (
                            <div className="space-y-5">
                                {[
                                    { title: 'Safe GLP-1 Tapering Protocol', desc: 'Gradually reduce medication under supervision to minimize rebound weight gain risk' },
                                    { title: 'Reverse Diet & Appetite Training', desc: 'Slowly increase caloric intake while retraining natural hunger signals' },
                                    { title: 'Metabolic Stabilization', desc: 'Restore metabolic rate through strategic nutrition and exercise programming' },
                                    { title: 'Strength Rebuilding & Gut Reset', desc: 'Intensive strength training combined with gut health restoration for long-term success' }
                                ].map((step, index) => (
                                    <div key={index} className="flex gap-5 p-5 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">
                                                <span className="bg-blue-100 text-primary px-3 py-1 rounded-lg">{step.title}</span>
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-green-50 border-t-4 border-secondary">
                        <div className="text-center">
                            {contactRequested ? (
                                <>
                                    <h3 className="text-2xl font-bold text-green-800 mb-3">Ready to Start Your Journey?</h3>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Our team will contact you at <strong className="text-green-800">{phone}</strong> to discuss your personalized plan and next steps.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-green-800 mb-3">Start Your Journey Independently</h3>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        You've chosen to proceed on your own. Follow the action plan above to achieve your goals. Good luck on your journey!
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirmation Section */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-secondary text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
                        ✓
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-3">Results Submitted Successfully</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Thank you, <strong>{name}</strong>! Your assessment has been saved
                        {contactRequested ? ' and our specialists will review your results shortly' : '. You can start your journey using the action plan above'}.
                    </p>
                    {isSubmitting && (
                        <p className="text-sm text-gray-500 mt-3 italic">Submitting your results...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
