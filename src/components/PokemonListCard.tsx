import {Link} from "react-router-dom";
import getTypeColor from "./GetTypeColor";

interface Props {
  pokemon: {
    name: string;
    types: string[];
    sprite: string;
  };
  index: number;
}
const PokemonListCard = ({pokemon, index}: Props) => {
  const {name, types, sprite} = pokemon;

  return (
    <Link
      to={`/pokemon/${name}`}
      className='flex flex-col items-center p-2 rounded-lg w-[330px] h-[520px] shadow-xl hover:shadow-[0_0_10px_#CBCBCB] duration-300'
    >
      <div className='w-full text-right pr-6 pt-6 text-[#A2A2A2] font-semibold'>#{index}</div>
      <div className='flex w-[160px] relative mt-12 h-[160px] items-center justify-center bg-[#F1F1F1] rounded-full'>
        {sprite ? (
          <img
            loading='lazy'
            src={sprite}
            alt={`${name} sprite`}
            className='w-[300px] h-[170px] absolute object-cover'
          />
        ) : (
          <span>No image</span>
        )}
      </div>

      <span className='mt-6 font-bold text-2xl capitalize'>{name}</span>
      <div className='mt-4 font-bold text-md capitalize flex space-x-2'>
        {types.map((type, index) => (
          <div
            key={index}
            style={{backgroundColor: getTypeColor(type)}}
            className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)]'
          >
            {type}
          </div>
        ))}
      </div>
    </Link>
  );
};

export default PokemonListCard;
