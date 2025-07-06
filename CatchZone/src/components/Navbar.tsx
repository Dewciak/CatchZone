import SearchInput from "./SearchInput";
import PokemonTypeFilter from "./PokemonTypeFilter";
import Logo from "./Logo";

import {useState} from "react";

const Navbar = () => {
  const [isNavMobileVisible, setNavMobileVisible] = useState<boolean>(false);
  const handleMobileNav = () => {
    setNavMobileVisible((prev) => !prev);
  };
  return (
    <nav className=' flex justify-between z-10 fixed md:relative   w-full md:w-auto '>
      <div className='h-screen w-[300px] 2xl:w-[400px] hidden md:block ' />

      <div
        className={` flex bg-white duration-300 transform fixed top-0 left-0  ${
          isNavMobileVisible ? "translate-x-0" : "-translate-x-[100%] md:translate-x-0"
        }`}
      >
        <div className='flex flex-col  h-screen w-[300px] 2xl:w-[400px] px-6'>
          <div className='hidden md:block mt-10'>
            <Logo />
          </div>
          <div className='flex flex-col text-lg font-semibold text-[#474E5A] mt-28 md:mt-6'>
            <span>Search Pokemon</span>
            <div className='mt-2'>
              <SearchInput />
            </div>
            <div className='mt-6 border-b pb-10 border-[var(--color-border)]'>
              <PokemonTypeFilter />
            </div>
            <div className='flex flex-col space-y-4 mt-4'>
              <span>Quick Stats:</span>
              <div className='flex flex-col space-y-2 '>
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
      <div className='w-full md:hidden  fixed py-4 flex justify-between px-6 items-center backdrop-blur-md top-0 left-0'>
        <Logo />
        <button
          onClick={handleMobileNav}
          className='w-[45px] h-[45px] p-2  rounded-md flex flex-col justify-center items-center space-y-2   cursor-pointer'
        >
          <span
            className={`w-full h-[3px] bg-black rounded-full transition-transform duration-300 origin-left ${
              isNavMobileVisible ? "rotate-45 translate-y-[0px] ml-2 " : ""
            }`}
          />
          <span
            className={`w-full h-[3px] bg-black rounded-full transition-all duration-300 ${
              isNavMobileVisible ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-full h-[3px] bg-black rounded-full transition-transform duration-300 origin-left ${
              isNavMobileVisible ? "-rotate-45 -translate-y-[0px] ml-2" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
