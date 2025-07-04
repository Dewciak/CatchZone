import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <Link to='/' className='fixed py-6 px-4 font-bold text-3xl  w-full'>
      CatchZone
    </Link>
  );
};

export default Navbar;
