import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, ArrowRight } from "lucide-react"

export default function ChatbotSection() {
    const [currentStep, setCurrentStep] = useState(0)

    const chatMessages = [
        { role: "bot", content: "Hello! I'm your Al-Madina health assistant. How can I help you today?" },
        { role: "user", content: "I have a headache and slight fever since yesterday." },
        {
            role: "bot",
            content:
                "I'm sorry to hear that. Do you have any other symptoms like body aches, chills, or sensitivity to light?",
        },
        { role: "user", content: "Yes, I have some body aches too." },
        {
            role: "bot",
            content:
                "Based on your symptoms, you might be experiencing a common viral infection or flu. Would you like me to recommend some suitable medications?",
        },
        { role: "user", content: "Yes, please." },
        {
            role: "bot",
            content:
                "I recommend Paracetamol for fever and headache relief. We have Panadol Extra which is effective for these symptoms. Would you like to see this product?",
        },
        { role: "user", content: "Yes, show me." },
        {
            role: "bot",
            content:
                "Here's Panadol Extra (500mg). It's currently in stock and on a 10% discount. Would you like to add it to your cart?",
        },
    ]

    const visibleMessages = chatMessages.slice(0, Math.min(currentStep + 3, chatMessages.length))

    const handleNextStep = () => {
        if (currentStep < chatMessages.length - 3) {
            setCurrentStep(currentStep + 2)
        }
    }

    const handleRestart = () => {
        setCurrentStep(0)
    }

    return (
        <section className="py-12 px-4 bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Powered Health Assistant</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our intelligent chatbot helps you identify potential health issues based on your symptoms and recommends
                            the right products for your needs.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <div className="mr-3 bg-[#081c3b]/20 p-1 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-red-600" />
                                </div>
                                <span className="text-gray-700">Describe your symptoms in simple language</span>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-3 bg-[#081c3b]/20 p-1 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-red-600" />
                                </div>
                                <span className="text-gray-700">Get potential condition assessments</span>
                            </li>
                            <li className="flex items-start">
                                <div className="mr-3 bg-[#081c3b]/20 p-1 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-red-600" />
                                </div>
                                <span className="text-gray-700">Receive personalized product recommendations</span>
                            </li>
                        </ul>
                        <Button className="bg-[#081c3b]">
                            Try Our Health Assistant <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="lg:w-1/2">
                        <Card className="border-2 border-emerald-100 shadow-lg max-w-md mx-auto py-0">
                            <CardContent className="p-0">
                                <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center">
                                    <MessageSquare className="h-5 w-5 mr-2" />
                                    <h3 className="font-medium">Al-Madina Health Assistant</h3>
                                </div>
                                <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4">
                                    {visibleMessages.map((message, index) => (
                                        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${message.role === "user"
                                                    ? "bg-red-600 text-white rounded-tr-none"
                                                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                                                    }`}
                                            >
                                                {message.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-gray-200 flex justify-between">
                                    {currentStep < chatMessages.length - 3 ? (
                                        <Button onClick={handleNextStep} className="w-full bg-red-600 hover:bg-red-700">
                                            See More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button onClick={handleRestart} className="w-full bg-red-600 hover:bg-red-700">
                                            Restart Demo
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
