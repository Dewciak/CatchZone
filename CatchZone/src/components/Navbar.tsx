import {Link} from "react-router-dom";
import SearchInput from "./SearchInput";
import PokemonTypeFilter from "./PokemonTypeFilter";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className='flex bg-white '>
      <div className='h-screen w-[300px] 2xl:w-[400px]' />
      {/* Space Holder for fixed nav ^ */}
      <div className='flex flex-col fixed h-screen w-[300px] 2xl:w-[400px] px-6'>
        <Logo />
        <div className='flex flex-col text-lg font-semibold text-[#474E5A]'>
          <span>Search Pokemon</span>
          <div className='mt-2'>
            <SearchInput />
          </div>
          <div className='mt-4 border-b pb-10 border-[var(--color-border)]'>
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
  );
};

export default Navbar;
