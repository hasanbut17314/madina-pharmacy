import { Pill, Stethoscope, Truck, Clock, MessageSquareText, ShoppingBag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FeatureSection() {
    const features = [
        {
            icon: <Pill className="h-10 w-10 text-red-600" />,
            title: "Wide Range of Medications",
            description: "Access to prescription drugs, over-the-counter medications, and health supplements.",
        },
        {
            icon: <Stethoscope className="h-10 w-10 text-red-600" />,
            title: "Symptom Analysis",
            description: "Our AI chatbot helps identify potential conditions based on your symptoms.",
        },
        {
            icon: <MessageSquareText className="h-10 w-10 text-red-600" />,
            title: "24/7 Chat Support",
            description: "Get health advice and product recommendations any time of day.",
        },
        {
            icon: <ShoppingBag className="h-10 w-10 text-red-600" />,
            title: "Personalized Recommendations",
            description: "Receive tailored product suggestions based on your health needs.",
        },
        {
            icon: <Truck className="h-10 w-10 text-red-600" />,
            title: "Fast Delivery",
            description: "Quick and reliable delivery of your health essentials to your doorstep.",
        },
        {
            icon: <Clock className="h-10 w-10 text-red-600" />,
            title: "Prescription Refills",
            description: "Easy and convenient prescription refill service with reminders.",
        },
    ]

    return (
        <section className="py-14 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Features We Offer</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Al-Madina Pharmacy provides comprehensive healthcare solutions to meet all your medical needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 p-3 bg-red-100 rounded-full">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
