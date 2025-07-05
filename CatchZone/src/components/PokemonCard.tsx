import type {Pokemon, Type} from "../types/pokemon";
import {Link} from "react-router-dom";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon: {name, sprites, types, weight, height, id}}: Props) => {
  const typeColors: Record<string, string> = {
    normal: "hsl(30, 30%, 85%)",
    fire: "hsl(15, 100%, 80%)",
    water: "hsl(200, 100%, 85%)",
    grass: "hsl(120, 60%, 80%)",
    electric: "hsl(50, 100%, 80%)",
    ice: "hsl(190, 80%, 90%)",
    fighting: "hsl(0, 60%, 75%)",
    poison: "hsl(290, 60%, 80%)",
    ground: "hsl(35, 50%, 75%)",
    flying: "hsl(210, 60%, 85%)",
    psychic: "hsl(320, 60%, 85%)",
    bug: "hsl(90, 60%, 75%)",
    rock: "hsl(40, 30%, 75%)",
    ghost: "hsl(250, 40%, 80%)",
    dragon: "hsl(270, 80%, 75%)",
    dark: "hsl(220, 20%, 60%)",
    steel: "hsl(210, 10%, 75%)",
    fairy: "hsl(330, 70%, 85%)",
  };

  return (
    <Link to={`/pokemon/${name}`} className='flex flex-col items-center  p-2 rounded-lg w-[330px] h-[500px] shadow-xl '>
      <div className='w-full text-right pr-6 pt-6 text-[#A2A2A2] font-semibold'> N'{id}</div>
      <div className='flex w-[150px] relative mt-12 h-[150px] items-center justify-center bg-[#F1F1F1] rounded-full'>
        {sprites?.front_default ? (
          <img
            src={sprites.front_default}
            alt={`${name} sprite`}
            className='w-[300px] h-[170px]    absolute object-cover'
          />
        ) : (
          <span>Brak obrazka</span>
        )}
      </div>

      <span className='mt-10 font-bold text-2xl capitalize'> {name}</span>
      <div className='mt-6 font-bold text-md uppercase flex space-x-2'>
        {types.map((t) => (
          <div
            style={{backgroundColor: typeColors[t.type.name] || "hsl(0, 0%, 100%)"}}
            className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)]'
          >
            {t.type.name}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center space-x-6 mt-8 font-semibold'>
        <div className='flex flex-col text-center '>
          <span className='text-[#A2A2A2]'>Weight </span>
          <span className='text-[#5D5D5D]'> {weight} kg</span>
        </div>
        <div className='flex flex-col text-center'>
          <span className='text-[#A2A2A2]'>height </span>
          <span className='text-[#5D5D5D]'> {height / 10} m</span>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
