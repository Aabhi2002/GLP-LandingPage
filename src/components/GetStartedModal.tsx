import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GetStartedModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Form submitted:", formData);
        setIsSubmitted(true);
        setIsSubmitting(false);

        // Close modal after 2 seconds
        setTimeout(() => {
            onClose();
            setIsSubmitted(false);
            setFormData({ firstName: "", lastName: "", phone: "", email: "" });
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <div className="p-8 pb-6 text-center border-b border-gray-100">
                    <div className="inline-flex items-baseline gap-1 mb-2">
                        <h2 className="text-3xl font-display font-bold text-gray-900">
                            Get Started with GLP-1
                        </h2>
                        <span className="inline-flex items-baseline ml-1">
                            <span
                                className="text-3xl font-black text-secondary"
                                style={{
                                    textShadow: "0 0 10px rgba(139,195,74,0.4)",
                                    filter: "brightness(1.1)",
                                }}
                            >
                                360
                            </span>
                            <sup
                                className="text-lg align-super text-secondary font-bold ml-0.5"
                                style={{ textShadow: "0 0 8px rgba(139,195,74,0.3)" }}
                            >
                                ™
                            </sup>
                        </span>
                    </div>
                    <p className="text-gray-600">
                        Fill in your details and we'll contact you to begin your transformation
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="John"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="Doe"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-gray-50 hover:bg-white"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-secondary to-green-600 hover:from-secondary/90 hover:to-green-600/90 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                By submitting, you agree to be contacted by our team
                            </p>
                        </form>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Thank You!
                            </h3>
                            <p className="text-gray-600">
                                We'll contact you shortly to begin your journey.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
