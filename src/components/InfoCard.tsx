import type {Pokemon} from "../types/pokemon";
import getTypeColor from "./GetTypeColor";

interface InfoCardProps {
  id: number;
  imageUrl: string;
  types: Pokemon["types"];
  weight: number;
  height: number;
  base_experience: number;
  movesCount: number;
}

const InfoCard = ({id, imageUrl, types, weight, height, base_experience, movesCount}: InfoCardProps) => {
  return (
    <div
      className='md:w-[40%] mt-24 md:mt-0 w-full md:h-[660px] flex flex-col items-center justify-center rounded-[40px]'
      style={{backgroundImage: `linear-gradient(to bottom, white 40%, ${getTypeColor(types[0].type.name)})`}}
    >
      <span className='font-semibold text-xl mt-6'>#{id}</span>
      <img src={imageUrl} className='w-[60%] max-h-full object-cover mt-6' />

      <div className='w-full bg-white h-full rounded-[40px] flex items-center justify-center flex-col space-y-4 pb-10 md:pb-0'>
        <div className='flex mt-8 flex-col'>
          <span className='text-[#A2A2A2] font-semibold text-center md:text-left'>Types</span>
          <div className='flex space-x-4 mt-4'>
            {types.map((t, index) => (
              <div
                key={index}
                style={{backgroundColor: getTypeColor(t.type.name)}}
                className='py-3 px-5 rounded-[5px] text-[hsla(0,0%,0%,0.8)] font-bold text-md capitalize'
              >
                {t.type.name}
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-y-4 w-[250px] justify-between font-semibold text-center text-gray-700 mt-2'>
          <div className='flex flex-col'>
            <span className='text-[#A2A2A2]'>Weight</span>
            <span>{(weight / 10).toFixed(1)} kg</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[#A2A2A2]'>Height</span>
            <span>{(height / 10).toFixed(1)} m</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[#A2A2A2]'>Exp</span>
            <span>{base_experience}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-[#A2A2A2]'>Moves</span>
            <span>{movesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
