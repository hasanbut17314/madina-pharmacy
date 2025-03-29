import React from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header
      className="w-full bg-[#1D3557] text-white 
                 flex items-center justify-between 
                 px-4 py-3
                 md:px-6 lg:px-8"
    >
      {/* Logo/Image Section */}
      <div className="flex items-center">
        <img
          src="logo.webp"
          alt="Logo"
          className="sm:h-14 h-10 mr-4 rounded-full"
        />
        {/* <h1 className="text-lg font-bold text-red-400">Madina Pharmacy</h1> */}
      </div>

      {/* Logout Button */}
      <Button
        className="bg-[#457B9D] text-white 
                   flex items-center 
                   hover:bg-[#1D4E79] 
                   transition-colors 
                   duration-300"
        onClick={() => {
          // Add logout logic here
          console.log('Logout clicked')
        }}
      >
        <LogOut className="md:mr-1 h-5 w-5" />
        <span className='hidden md:block'>Logout</span>
      </Button>
    </header>
  )
}

export default Header