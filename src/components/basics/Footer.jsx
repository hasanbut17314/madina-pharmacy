import React from 'react'

const Footer = () => {
  // Pharmacy-related footer links
  const footerLinks = [
    {
      category: 'Patient Services',
      links: [
        'Prescription Refills',
        'Medication Counseling',
        'Vaccination Center',
        'Health Screenings',
        'Medication Delivery'
      ]
    },
    {
      category: 'Health & Wellness',
      links: [
        'Nutrition Advice',
        'Chronic Disease Management',
        'Weight Management',
        'Mental Health Resources',
        'Preventive Care Tips'
      ]
    },
    {
      category: 'Our Pharmacy',
      links: [
        'About Our Team',
        'Store Locations',
        'Operating Hours',
        'Insurance Partners',
        'Quality Assurance'
      ]
    },
    {
      category: 'Customer Support',
      links: [
        'Contact Pharmacist',
        'Insurance Inquiries',
        'Technical Support',
        'Feedback',
        'Accessibility Services'
      ]
    }
  ]

  return (
    <footer 
      className="bg-[#1D3557] text-white 
                 py-12 px-4 
                 md:px-6 lg:px-8 rounded-t-md"
    >
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {footerLinks.map((section, index) => (
          <div key={index} className="space-y-3">
            <h4 className="font-bold text-lg mb-3 text-[#A8DADC]">
              {section.category}
            </h4>
            {section.links.map((link, linkIndex) => (
              <a 
                key={linkIndex} 
                href="#" 
                className="block text-sm text-white/80 
                           hover:text-white 
                           hover:underline 
                           transition-colors 
                           duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      
      {/* Copyright Section */}
      <div className="text-center mt-10 pt-6 border-t border-white/20">
        <p className="text-sm text-white/70">
          © {new Date().getFullYear()} Madina Pharmacy. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer