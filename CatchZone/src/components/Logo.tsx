import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className=' py-6  z-10 space-y-2  font-bold cursor-pointer   '>
      <h1 className='text-4xl w-fit bg-[linear-gradient(90deg,#9C0000,#FF0000)] bg-clip-text text-transparent'>
        CatchZone
      </h1>
      <h2 className='text-2xl text-[#0E2056]'>Pokedex</h2>
    </Link>
  );
};

export default Logo;
