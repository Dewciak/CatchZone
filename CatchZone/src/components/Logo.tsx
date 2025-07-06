import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className=' md:py-6  z-10 md:space-y-2  font-bold cursor-pointer   '>
      <h1 className='md:text-4xl text-2xl w-fit bg-[linear-gradient(90deg,#9C0000,#FF0000)] bg-clip-text text-transparent'>
        CatchZone
      </h1>
      <h2 className='md:text-2xl text-md text-[#0E2056]'>Pokedex</h2>
    </Link>
  );
};

export default Logo;
