import Logo from "./Logo";
import PokemonTypeFilter from "./PokemonTypeFilter";
import SearchInput from "./SearchInput";

import {useState} from "react";
import HamburgerButton from "./HamburgerButton";

const Navbar = () => {
  const [isNavMobileVisible, setNavMobileVisible] = useState<boolean>(false);

  // Toggles the mobile navigation sidebar
  const handleMobileNav = () => {
    setNavMobileVisible((prev) => !prev);
  };

  return (
    <nav className='flex justify-between z-10 fixed md:relative w-full md:w-auto'>
      {/* Empty spacer to reserve space for the fixed sidebar on desktop */}
      <div className='h-screen w-[300px] 2xl:w-[400px] hidden md:block' />

      {/* Sidebar navigation (fixed for mobile, static for desktop) */}
      <div
        className={`flex bg-white duration-300 transform fixed top-0 left-0 ${
          isNavMobileVisible ? "translate-x-0" : "-translate-x-[100%] md:translate-x-0"
        }`}
      >
        <div className='flex flex-col h-screen w-[300px] 2xl:w-[400px] px-6'>
          {/* Logo only visible on desktop */}
          <div className='hidden md:block mt-10'>
            <Logo />
          </div>

          {/* Sidebar content */}
          <div className='flex flex-col text-lg font-semibold text-[#474E5A] mt-28 md:mt-6'>
            <span>Search Pokemon on a page</span>

            <div className='mt-2'>
              <SearchInput />
            </div>

            <div className='mt-6 border-b pb-10 border-[var(--color-border)]'>
              <PokemonTypeFilter />
            </div>

            <div className='flex flex-col space-y-4 mt-4'>
              <span>Quick Stats:</span>

              <div className='flex flex-col space-y-2'>
                <div className='w-full flex justify-between'>
                  <p className='text-[#474e5ab7]'>Total pokemon:</p>
                  <p className='bg-[var(--color-border)] p-1 rounded-full'>1302</p>
                </div>
                <div className='w-full flex justify-between'>
                  <p className='text-[#474e5ab7]'>Types:</p>
                  <p className='bg-[var(--color-border)] p-1 px-2 rounded-full'>18</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile top navbar with logo and hamburger button */}
      <div className='w-full md:hidden fixed py-4 flex justify-between px-6 items-center backdrop-blur-md top-0 left-0'>
        <Logo />
        <HamburgerButton isOpen={isNavMobileVisible} onClick={handleMobileNav} />
      </div>
    </nav>
  );
};

export default Navbar;
