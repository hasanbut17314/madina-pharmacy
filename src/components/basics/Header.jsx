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

  // Routes where nav links, cart, and profile should be hidden
  const restrictedRoutes = ["/admin", "/manager", "/rider"];
  const shouldShowNavElements = !restrictedRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  // Determine if we are on 'rider' or 'manager' routes
  const isRiderOrManager = ['/rider', '/manager'].includes(location.pathname);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-[#081c3b] text-white flex items-center justify-between px-4 py-2 md:px-6 lg:px-8">
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

      <div className="flex items-center space-x-2">
        {/* Cart */}
        {shouldShowNavElements && (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer text-white hover:bg-[#457B9D]"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        )}

        {/* Profile Menu */}
        {shouldShowNavElements && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-[#457B9D]">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/user')}>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Always visible logout for non-'rider' and 'manager' routes */}
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
            <SheetContent side="right" className="w-64 sm:w-72">
              <div className="mt-4 mb-6">
                <h2 className="text-xl font-semibold text-[#1D3557]">Menu</h2>
                <hr className="mt-2 border-[#A8DADC]" />
              </div>

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
                      className="cursor-pointer px-3 py-2 rounded-md text-foreground hover:bg-[#F1FAEE] hover:text-[#457B9D] transition-all duration-200 font-medium"
                    >
                      {link.name}
                    </span>
                  ))}
                </nav>
              )}

              {/* Always visible logout in mobile */}
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

        {/* Show logout button for 'rider' and 'manager' on all screen sizes */}
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
