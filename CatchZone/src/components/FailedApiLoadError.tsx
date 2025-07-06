import SadPikachu from "../assets/images/PikachuSad.webp";

const FailedApiLoadError = () => {
  return (
    <div className='flex flex-col w-full h-screen  justify-center items-center'>
      <img src={SadPikachu} className='w-[400px] h-[400px]' />

      <div className='flex flex-col text-center text-xl  '>
        <span className='text-4xl font-bold'>Oops! We couldn't load the data.</span>
        <span className=' text-gray-400 mt-2'>
          Something went wrong while fetching Pokémon data. <br /> Please try again.
        </span>
      </div>

      <button
        onClick={() => window.location.reload()}
        className='text-2xl px-12 py-2 bg-[var(--color-primary)] text-white rounded-md mt-6 hover:scale-105 duration-300 cursor-ponter'
      >
        Retry
      </button>
    </div>
  );
};

export default FailedApiLoadError;
