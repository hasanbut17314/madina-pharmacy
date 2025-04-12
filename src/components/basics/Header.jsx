import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, ShoppingCart, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const restrictedRoutes = ["/admin", "/manager", "/rider"];
  const shouldShowNavElements = !restrictedRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  const isRiderOrManager = ['/rider', '/manager'].includes(location.pathname);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-[#081c3b] text-white flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="logo.webp"
          alt="Logo"
          className="h-8 w-auto md:h-10 lg:h-12 mr-2"
        />
      </div>

      {/* Desktop Nav */}
      {shouldShowNavElements && (
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <span
              key={link.name}
              onClick={() => navigate(link.href)}
              className="cursor-pointer text-white hover:text-[#A8DADC] transition-colors duration-300"
            >
              {link.name}
            </span>
          ))}
        </nav>
      )}

      {/* Right Side */}
      <div className="flex items-center space-x-2">
        {/* Desktop Search Bar */}
        {shouldShowNavElements && (
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1.5 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A8DADC] w-64"
            />
            <button
              onClick={() => console.log('Search:', searchQuery)}
              className="absolute right-2 text-[#1D3557] hover:text-[#457B9D]"
            >
              🔍
            </button>
          </div>
        )}

        {/* Cart */}
        {shouldShowNavElements && (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-white hover:bg-[#457B9D] hidden md:inline-flex"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        {/* Profile Menu */}
        {shouldShowNavElements && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-[#457B9D] hidden md:inline-flex">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/user')}>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Logout Button for Non-Rider/Manager */}
        {!isRiderOrManager && (
          <Button
            variant="secondary"
            className="bg-[#457B9D] text-white hover:bg-[#1D4E79] hidden md:flex"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </Button>
        )}

        {/* Mobile Drawer */}
        {!isRiderOrManager && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-[#457B9D] md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-4 mb-6">
                <h2 className="text-xl font-semibold text-[#1D3557]">Menu</h2>
                <hr className="mt-2 border-[#A8DADC]" />
              </div>

              {/* Stylish Search Bar in Drawer */}
              {shouldShowNavElements && (
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for products..."
                      className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
                    />
                    <button
                      onClick={() => {
                        console.log('Search:', searchQuery);
                        setIsSheetOpen(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1D3557] hover:text-[#457B9D]"
                    >
                      🔍
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Nav Links */}
              {shouldShowNavElements && (
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <span
                      key={link.name}
                      onClick={() => {
                        navigate(link.href);
                        setIsSheetOpen(false);
                      }}
                      className="cursor-pointer px-4 py-2 rounded-md hover:bg-[#F1FAEE] hover:text-[#457B9D] text-[#1D3557] font-medium transition-all duration-200"
                    >
                      {link.name}
                    </span>
                  ))}
                </nav>
              )}

              {/* Logout in Drawer */}
              {!isRiderOrManager && (
                <Button
                  variant="secondary"
                  className="bg-[#457B9D] text-white hover:bg-[#1D4E79] w-full mt-6 rounded-md"
                  onClick={() => {
                    console.log('Logout clicked');
                    setIsSheetOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Logout</span>
                </Button>
              )}
            </SheetContent>
          </Sheet>
        )}

        {/* Logout Button for Rider or Manager */}
        {isRiderOrManager && (
          <Button
            variant="secondary"
            className="bg-[#457B9D] text-white hover:bg-[#1D4E79] w-full mt-0 rounded-md"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
