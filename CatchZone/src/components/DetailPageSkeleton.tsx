import Footer from "./Footer";
import Logo from "./Logo";
import Navbar from "./Navbar";
import {SvgArrow} from "./SvgArrow";

const DetailPageSkeleton = () => {
  return (
    <div className='w-full md:h-screen flex justify-center items-center flex-col px-12 md:px-0 pb-20 relative'>
      <div className='md:hidden'>
        <Navbar />
      </div>
      {/* Logo at the top */}
      <div className='absolute top-0 left-0 w-full p-6 hidden md:block'>
        <Logo />
      </div>

      <div className='flex flex-col-reverse md:flex-row max-w-[1150px] w-full items-center'>
        {/* Left side – details */}
        <div className='md:w-[60%] w-full  px-0 md:px-12 mt-10 md:mt-0 pb-20 md:pb-0'>
          <div className='flex space-x-3 items-center'>
            {/* Back button */}
            <div className='bg-gray-200 rounded-full p-1 hover:scale-110 duration-300 group hover:bg-[var(--color-primary)]'>
              <div className='rotate-180 group-hover:text-white'>
                <SvgArrow />
              </div>
            </div>
            {/* Pokemon name */}
            <h1 className='mt-0 font-bold text-3xl capitalize'>name</h1>
          </div>

          {/* Abilities */}
          <h2 className='mt-6'>Abilities</h2>
          <div className='flex flex-wrap gap-4 mt-4 text-gray-700'>
            <div className='p-2 bg-gray-200 px-6 font-semibold rounded-lg capitalize flex items-center justify-center '>
              <p className='whitespace-nowrap w-[40px] h-5' />
            </div>
            <div className='p-2 bg-gray-200 px-6 font-semibold rounded-lg capitalize flex items-center justify-center '>
              <p className='whitespace-nowrap w-[40px] h-5' />
            </div>
          </div>

          {/* Moves (limited to 3) */}
          <h2 className='mt-6'>Moves</h2>
          <div className='flex flex-wrap gap-4 mt-4 text-gray-700'>
            <div className='p-2 bg-gray-200 rounded-lg font-semibold px-6 capitalize flex items-center justify-center'>
              <p className='whitespace-nowrap w-[40px] h-5' />
            </div>
            <div className='p-2 bg-gray-200 rounded-lg font-semibold px-6 capitalize flex items-center justify-center'>
              <p className='whitespace-nowrap w-[40px] h-5' />
            </div>
          </div>

          {/* Stats bar */}
          <div className='flex flex-col mt-10 space-y-3'>
            <div className='w-full h-3 bg-gray-200 rounded-full' />
            <div className='w-full h-3 bg-gray-200 rounded-full' />
            <div className='w-full h-3 bg-gray-200 rounded-full' />
            <div className='w-full h-3 bg-gray-200 rounded-full' />
            <div className='w-full h-3 bg-gray-200 rounded-full' />
          </div>
        </div>

        {/* Right side – image and info card */}
        <div className='md:w-[40%] bg-gray-300 mt-24 md:mt-0 w-full md:h-[660px] flex flex-col items-center justify-center rounded-[40px]'>
          {/* Pokemon ID */}

          {/* Pokemon image */}
          <div className='w-[60%] h-[270px] md:h-[700px]  max-h-full object-cover mt-6' />

          {/* Info card */}
          <div className='w-full bg-white h-full rounded-[40px] flex items-center justify-center flex-col space-y-4 pb-10 md:pb-0'>
            {/* Pokemon name */}

            {/* Type badges */}
            <div className='flex mt-8 flex-col'>
              <span className='text-[#A2A2A2] font-semibold text-center md:text-left'>Types</span>
              <div className='flex space-x-4 mt-4'>
                <div className='py-3 px-5 rounded-[5px] text-[hsla(0,0%,0%,0.8)] font-bold text-md capitalize'>
                  badge
                </div>
              </div>
            </div>

            {/* Basic info (weight, height, exp, etc.) */}
            <div className='grid grid-cols-2 gap-y-4 w-[250px] justify-between font-semibold text-center text-gray-700 mt-2 '>
              <div className='flex flex-col'>
                <span className='text-[#A2A2A2]'>Weight</span>
                <span>kg</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-[#A2A2A2]'>Height</span>
                <span> m</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-[#A2A2A2]'>Exp</span>
                <span />
              </div>
              <div className='flex flex-col'>
                <span className='text-[#A2A2A2]'>Moves</span>
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPageSkeleton;
