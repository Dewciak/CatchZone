import CardSkeleton from "./CardSkeleton";

const ListSkeleton = ({pokemonsPerPage}: {pokemonsPerPage: number}) => {
  return (
    <div className='w-full mx-auto md:mt-48 mt-[290px] pb-32 max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px] text-center md:text-right px-12 md:px-0'>
      <div className='text-2xl font-semibold text-gray-400 flex space-x-2 items-center justify-center'>
        <span>Loading...</span>
        <div className='w-4 h-4 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin' />
      </div>
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 mt-16 place-items-center'>
        {Array.from({length: pokemonsPerPage}, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ListSkeleton;
