import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I become an instructor?",
            answer:
                "You can become an instructor by signing up and submitting your teaching profile. Once approved, you can create and sell your courses.",
        },
        {
            question: "What courses can I teach?",
            answer:
                "You can teach courses in any field where you have expertise, including programming, design, business, and more.",
        },
        {
            question: "Is there a cost to join?",
            answer:
                "Joining as an instructor is free. We take a small commission from your course sales.",
        },
        {
            question: "How do I get paid?",
            answer:
                "You’ll receive payments directly to your bank account or PayPal based on our payment schedule.",
        },
        {
            question: "Can I teach in multiple languages?",
            answer:
                "Yes, you can create courses in any language and reach a global audience.",
        },
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-50 pb-12">
            <div className="w-[95%] lg:w-[90%] mx-auto">

                <SectionTitle
                    title="Frequently Asked Questions"
                    subTitle="Here are some common questions and answers to help you get started."
                ></SectionTitle>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-semibold focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <span>
                                    {activeIndex === index ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.707a1 1 0 011.414 0L10 4.414l3.293 3.293a1 1 0 011.414-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 000 1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="px-6 py-4 text-gray-700">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;