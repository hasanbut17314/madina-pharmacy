import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      subject: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For demonstration, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      error: false
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
        <p className="mt-4 text-xl text-gray-500">We're here to help with your medication needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3 text-base">
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="mt-1 text-gray-600">Customer Service: (123) 456-7890</p>
                  <p className="text-gray-600">Prescription Help: (123) 456-7891</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3 text-base">
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="mt-1 text-gray-600">info@madinapharmacy.com</p>
                  <p className="text-gray-600">prescriptions@madinapharmacy.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3 text-base">
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="mt-1 text-gray-600">123 Health Street</p>
                  <p className="text-gray-600">Madina District, City</p>
                  <p className="text-gray-600">Postal Code: 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 text-base">
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="mt-1 text-gray-600">Monday - Friday: 8:00 AM - 10:00 PM</p>
                  <p className="text-gray-600">Saturday - Sunday: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Emergency Support</h2>
            <p className="text-gray-600 mb-4">
              For urgent medication needs or emergencies, please call our 24/7 emergency line:
            </p>
            <p className="text-lg font-bold text-red-600">(123) 456-7899</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
          
          {formStatus.submitted ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Thank you for contacting us! We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Select name="subject" value={formData.subject} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                    <SelectItem value="Prescription Question">Prescription Question</SelectItem>
                    <SelectItem value="Delivery Issue">Delivery Issue</SelectItem>
                    <SelectItem value="Product Information">Product Information</SelectItem>
                    <SelectItem value="Feedback">Feedback</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <Textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send Message
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg text-gray-900 mb-2">How quickly can I receive my medication?</h3>
            <p className="text-gray-600">We offer same-day delivery for orders placed before 2 PM in most service areas. For other areas, delivery typically takes 1-2 business days.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg text-gray-900 mb-2">How do I transfer my prescription to Madina Pharmacy?</h3>
            <p className="text-gray-600">You can transfer your prescription by providing your current pharmacy information through our app, website, or by calling our customer service team.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg text-gray-900 mb-2">Do you accept insurance?</h3>
            <p className="text-gray-600">Yes, we accept most major insurance plans. You can add your insurance information to your account or provide it when placing your order.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg text-gray-900 mb-2">How do I check the status of my order?</h3>
            <p className="text-gray-600">You can track your order in real-time through our mobile app or website. We also send SMS notifications with delivery updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;