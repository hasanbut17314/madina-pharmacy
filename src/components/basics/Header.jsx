import React from 'react'
import { LogOut } from 'lucide-react'

const Header = () => {
  return (
    <header 
      className="w-full bg-[#1D3557] text-white 
                 flex items-center justify-between 
                 px-4 py-2 
                 md:px-6 lg:px-8 rounded-b-md"
    >
      {/* Logo/Image Section */}
      <div className="flex items-center">
        <img 
          src="logo.webp" 
          alt="Logo" 
          className="h-15 w-60 mr-4 rounded-full"
        />
        {/* <h1 className="text-lg font-bold text-red-400">Madina Pharmacy</h1> */}
      </div>

      {/* Logout Button */}
      <button 
        className="bg-[#457B9D] text-white 
                   px-3 py-2 
                   rounded-md 
                   flex items-center 
                   hover:bg-[#1D4E79] 
                   transition-colors 
                   duration-300"
        onClick={() => {
          // Add logout logic here
          console.log('Logout clicked')
        }}
      >
        <LogOut className="mr-2 h-5 w-5" />
        <span className='hidden md:block'>Logout</span>
      </button>
    </header>
  )
}

export default Header