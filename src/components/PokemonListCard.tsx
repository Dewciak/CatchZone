import {Link} from "react-router-dom";
import type {Pokemon} from "../types/pokemon";
import getTypeColor from "./GetTypeColor";

interface Props {
  pokemon: Pokemon;
}

const PokemonListCard = ({pokemon: {name, sprites, types, weight, height, id}}: Props) => {
  const imageUrl =
    sprites.other?.["official-artwork"]?.front_default || sprites.other?.home?.front_default || sprites.front_default;
  return (
    <Link
      to={`/pokemon/${name}`}
      className='flex flex-col items-center  p-2 rounded-lg w-[330px] h-[520px] shadow-xl hover:shadow-[0_0_10px_#CBCBCB] duration-300 '
    >
      <div className='w-full text-right pr-6 pt-6 text-[#A2A2A2] font-semibold'> #{id}</div>
      <div className='flex w-[160px] relative mt-12 h-[160px] items-center justify-center bg-[#F1F1F1] rounded-full'>
        {sprites?.front_default ? (
          <img
            loading='lazy'
            src={imageUrl}
            alt={`${name} sprite`}
            className='w-[300px] h-[170px]    absolute object-cover'
          />
        ) : (
          <span>No image</span>
        )}
      </div>

      <span className='mt-6 font-bold text-2xl capitalize'> {name}</span>
      <div className='mt-4 font-bold text-md capitalize flex space-x-2'>
        {types.map((t, index) => (
          <div
            key={index}
            style={{backgroundColor: getTypeColor(t.type.name)}}
            className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)]'
          >
            {t.type.name}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center space-x-6 mt-6 font-semibold'>
        <div className='flex flex-col text-center '>
          <span className='text-[#A2A2A2]'>Weight </span>
          <span className='text-[#5D5D5D]'>{(weight / 10).toFixed(1)} kg</span>
        </div>
        <div className='flex flex-col text-center'>
          <span className='text-[#A2A2A2]'>height </span>
          <span className='text-[#5D5D5D]'> {height / 10} m</span>
        </div>
      </div>
    </Link>
  );
};

export default PokemonListCard;
