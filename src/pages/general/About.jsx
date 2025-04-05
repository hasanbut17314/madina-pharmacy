import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Madina Pharmacy</h1>
        <p className="mt-4 text-xl text-gray-500">Your trusted partner for online medicine delivery</p>
      </div>

      <div className="prose prose-lg mx-auto">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p  className='border-2 border-gray-300 p-4 rounded-lg'>
            Founded in 2024, Madina Pharmacy began with a simple mission: to make healthcare more accessible to everyone. 
            We recognized the challenges many people face when trying to get their medications—whether due to mobility issues, 
            busy schedules, or geographic constraints—and set out to create a solution that brings pharmacy services directly to your doorstep.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p  className='border-2 border-gray-300 p-4 rounded-lg'>
            At Madina Pharmacy, we're committed to improving healthcare accessibility through convenient and reliable 
            online medicine delivery. We believe that everyone deserves easy access to their medications, without the 
            hassle of long wait times or inconvenient trips to the pharmacy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Fast Delivery</h3>
              <p>We ensure your medications reach you promptly, with same-day delivery options available in many areas.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Licensed Pharmacists</h3>
              <p>Our team of certified pharmacists reviews every order to ensure accuracy and safety.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Secure Ordering</h3>
              <p>Your personal and medical information is protected with state-of-the-art encryption technology.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Comprehensive Selection</h3>
              <p>We carry a wide range of prescription medications, OTC products, and wellness items.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Process</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Upload your prescription</strong> through our secure online platform or mobile app</li>
            <li><strong>Our pharmacists verify</strong> your prescription and prepare your medications</li>
            <li><strong>We deliver your medicine</strong> directly to your doorstep in discreet packaging</li>
            <li><strong>Receive follow-up support</strong> from our healthcare professionals if needed</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Our Team</h2>
          <p className='border-2 border-gray-300 p-4 rounded-lg'>
            Madina Pharmacy is powered by a dedicated team of healthcare professionals, including licensed 
            pharmacists, pharmacy technicians, and delivery specialists. Our team undergoes rigorous training 
            to ensure they provide the highest standard of service and care to our customers.
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;