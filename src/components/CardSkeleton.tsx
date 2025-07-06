const CardSkeleton = () => {
  return (
    <div className='flex flex-col items-center  p-2 rounded-lg w-[330px] h-[500px] shadow-xl animate-pulse '>
      <div className='w-full text-right pr-6 pt-6 text-[#A2A2A2] font-semibold'>#</div>
      <div className='flex w-[150px] relative mt-12 h-[150px] items-center justify-center bg-[#F1F1F1] rounded-full' />
      <span className='mt-10 font-bold text-2xl capitalize w-[100px] h-[40px] bg-[#F1F1F1] rounded-md'> </span>
      <div className='mt-6 font-bold text-md uppercase flex space-x-2'>
        <div className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)] w-[70px] h-[40px] bg-gray-200' />
        <div className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)] w-[70px] h-[40px] bg-gray-200' />
      </div>
      <div className='flex items-center justify-center space-x-6 mt-8 font-semibold'>
        <div className='flex flex-col text-center space-y-2 '>
          <span className=' w-[50px] h-[20px] bg-[#F1F1F1]' />
          <span className=' w-[50px] h-[20px] bg-[#F1F1F1]' />
        </div>
        <div className='flex flex-col text-center space-y-2'>
          <span className=' w-[50px] h-[20px] bg-[#F1F1F1]' />
          <span className=' w-[50px] h-[20px] bg-[#F1F1F1]' />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
