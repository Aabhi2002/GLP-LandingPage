import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { questionsConfig } from './questionsConfig';
import { calculateScore, getFinalCategory } from './scoring';
import { Answers, TestResult } from './types';
import ResultPage from './ResultPage.tsx';

export default function RiskScoreTest() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Answers>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contactRequested, setContactRequested] = useState(true);
    const [showContactForm, setShowContactForm] = useState(false);
    const [result, setResult] = useState<TestResult | null>(null);

    // Set page title
    useEffect(() => {
        document.title = 'GLP-1 360™ Risk Score Test | ReLiv';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Take the GLP-1 360™ Risk Score Test to discover your personalized category and action plan for safe, effective weight loss.');
        }
    }, []);

    // Determine which questions to show based on override logic
    const shouldShowQuestion = (index: number): boolean => {
        const question = questionsConfig[index];

        // Always show Q1-Q11
        if (index < 11) return true;

        // Q12 always shows
        if (question.id === 'q12') return true;

        // Q13 only shows if Q12 is "None"
        if (question.id === 'q13') {
            const q12Answer = answers['q12'];
            if (!q12Answer || !Array.isArray(q12Answer) || q12Answer.length === 0) return true;
            const q12Question = questionsConfig.find(q => q.id === 'q12');
            const noneOption = q12Question?.options.find(opt => opt.label === "None");
            return q12Answer.length === 1 && q12Answer[0] === noneOption?.id;
        }

        // Q14 only shows if Q12 and Q13 are both "None"
        if (question.id === 'q14') {
            const q12Answer = answers['q12'];
            const q13Answer = answers['q13'];

            const q12Question = questionsConfig.find(q => q.id === 'q12');
            const q13Question = questionsConfig.find(q => q.id === 'q13');
            const q12None = q12Question?.options.find(opt => opt.label === "None");
            const q13None = q13Question?.options.find(opt => opt.label === "None");

            const q12IsNone = Array.isArray(q12Answer) && q12Answer.length === 1 && q12Answer[0] === q12None?.id;
            const q13IsNone = Array.isArray(q13Answer) && q13Answer.length === 1 && q13Answer[0] === q13None?.id;

            return q12IsNone && q13IsNone;
        }

        return true;
    };

    const currentQuestion = questionsConfig[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questionsConfig.length - 1 ||
        (currentQuestionIndex < questionsConfig.length - 1 &&
            !shouldShowQuestion(currentQuestionIndex + 1));

    const handleSingleChoice = (questionId: string, optionId: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionId
        }));
    };

    const handleMultiChoice = (questionId: string, optionId: string) => {
        setAnswers(prev => {
            const current = (prev[questionId] as string[]) || [];

            // If "None" is selected, clear all others
            const noneOption = questionsConfig.find(q => q.id === questionId)
                ?.options.find(opt => opt.label === "None");

            if (noneOption && optionId === noneOption.id) {
                return { ...prev, [questionId]: [optionId] };
            }

            // If selecting other options, remove "None"
            let newSelection = current.includes(optionId)
                ? current.filter(id => id !== optionId)
                : [...current.filter(id => noneOption ? id !== noneOption.id : true), optionId];

            return { ...prev, [questionId]: newSelection };
        });
    };

    const isCurrentQuestionAnswered = (): boolean => {
        const answer = answers[currentQuestion.id];
        if (currentQuestion.type === "single") {
            return !!answer;
        } else {
            return Array.isArray(answer) && answer.length > 0;
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowContactForm(true);
        } else {
            // Find next question that should be shown
            let nextIndex = currentQuestionIndex + 1;
            while (nextIndex < questionsConfig.length && !shouldShowQuestion(nextIndex)) {
                nextIndex++;
            }

            if (nextIndex >= questionsConfig.length) {
                setShowContactForm(true);
            } else {
                setCurrentQuestionIndex(nextIndex);
            }
        }
    };

    const handlePrevious = () => {
        if (showContactForm) {
            setShowContactForm(false);
        } else if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim()) {
            alert('Please fill in your name and phone number');
            return;
        }

        const totalScore = calculateScore(answers, questionsConfig);
        const categoryResult = getFinalCategory(totalScore, answers, questionsConfig);

        setResult({
            answers,
            totalScore,
            baseCategory: categoryResult.category,
            finalCategory: categoryResult.category,
            isOverride: categoryResult.isOverride,
            triggeredBy: categoryResult.triggeredBy,
            triggeredFlags: categoryResult.flags,
            name: name.trim(),
            phone: phone.trim(),
            contactRequested: contactRequested
        });
    };

    if (result) {
        return <ResultPage result={result} />;
    }

    // Calculate total questions that will be shown
    const totalQuestionsToShow = questionsConfig.filter((_, index) => shouldShowQuestion(index)).length;
    const answeredCount = Object.keys(answers).length;
    const progress = ((answeredCount + 1) / (totalQuestionsToShow + 1)) * 100;

    return (
        <div className="min-h-screen bg-gray-50 font-body">
            {/* Back to Home Button */}
            <div className="container mx-auto px-4 pt-6">
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 rounded-2xl p-8 md:p-12 text-white shadow-xl mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-center">
                        GLP-1 360™ RISK SCORE TEST
                    </h1>
                    <p className="text-lg text-center mb-6 opacity-95">
                        Answer each question to receive your personalized category
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-gradient-to-r from-secondary to-green-400 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-center text-sm font-medium opacity-90">
                        Question {currentQuestionIndex + 1} of {questionsConfig.length}
                    </p>
                </div>

                {!showContactForm ? (
                    /* Question Form */
                    <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200">
                        <div className="mb-8">
                            <h2 className="text-xl font-display font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
                                {currentQuestion.section}
                            </h2>

                            <div className="mb-6">
                                <p className="text-xl font-semibold text-gray-800 mb-5 leading-relaxed">
                                    {currentQuestionIndex + 1}. {currentQuestion.question}
                                </p>

                                <div className="space-y-3">
                                    {currentQuestion.options.map((option) => {
                                        const isSelected = currentQuestion.type === "single"
                                            ? answers[currentQuestion.id] === option.id
                                            : Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).includes(option.id);

                                        return (
                                            <label
                                                key={option.id}
                                                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${isSelected
                                                    ? 'bg-blue-50 border-primary shadow-md transform translate-x-1'
                                                    : 'bg-gray-50 border-gray-200 hover:border-primary/50 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <input
                                                    type={currentQuestion.type === "single" ? "radio" : "checkbox"}
                                                    name={currentQuestion.id}
                                                    value={option.id}
                                                    checked={isSelected}
                                                    onChange={() => {
                                                        if (currentQuestion.type === "single") {
                                                            handleSingleChoice(currentQuestion.id, option.id);
                                                        } else {
                                                            handleMultiChoice(currentQuestion.id, option.id);
                                                        }
                                                    }}
                                                    className="w-5 h-5 text-primary focus:ring-primary focus:ring-2 cursor-pointer"
                                                />
                                                <span className={`ml-4 text-base ${isSelected ? 'text-primary font-medium' : 'text-gray-700'}`}>
                                                    {option.label}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-4 mt-8">
                            {currentQuestionIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-primary bg-white border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Previous
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!isCurrentQuestionAnswered()}
                                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md ml-auto ${isCurrentQuestionAnswered()
                                    ? 'bg-gradient-to-r from-primary to-blue-700 text-white hover:shadow-lg hover:-translate-y-0.5'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {isLastQuestion ? 'Continue' : 'Next'}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Contact Form */
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-gray-200">
                        <div className="mb-8">
                            <h2 className="text-2xl font-display font-bold text-primary mb-6 pb-3 border-b-2 border-primary">
                                Final Step: Your Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-base font-semibold text-gray-800 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-800 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50"
                                        required
                                    />
                                </div>

                                <div className="p-5 bg-green-50 border-2 border-secondary rounded-xl">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={contactRequested}
                                            onChange={(e) => setContactRequested(e.target.checked)}
                                            className="w-5 h-5 text-secondary focus:ring-secondary focus:ring-2 cursor-pointer mt-0.5 flex-shrink-0"
                                        />
                                        <span className="text-base text-green-800 font-medium leading-relaxed">
                                            I want your team to contact me to discuss my personalized plan
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-4 mt-8">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="inline-flex items-center gap-2 px-6 py-3 text-primary bg-white border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Previous
                            </button>

                            <button
                                type="submit"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-secondary to-green-600 text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md"
                            >
                                Get My Results
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
