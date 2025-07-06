import {Link} from "react-router-dom";
import SadGengar from "../assets/images/GengarSad.webp";

const NotFoundPage = () => {
  return (
    <div className='flex flex-col w-full h-screen  justify-center items-center'>
      <img src={SadGengar} className='w-[400px] h-[400px]' />

      <div className='flex flex-col items-start text-justify mt-12  '>
        <span className='text-4xl font-bold w-full'>Oops! Something went wrong.</span>
        <span className='text-[27px] text-gray-400 w-full'>We can't find the page you're looking for.</span>
      </div>

      <Link
        to='/'
        className='text-2xl px-12 py-2 bg-[var(--color-primary)] text-white rounded-md mt-6 hover:scale-105 duration-300 cursor-ponter'
      >
        Back
      </Link>
    </div>
  );
};

export default NotFoundPage;
