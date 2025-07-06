import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import FailedApiLoadError from "../components/FailedApiLoadError";
import getTypeColor from "../components/GetTypeColor";
import Logo from "../components/Logo";
import {SvgArrow} from "../components/SvgArrow";
import type {Pokemon} from "../types/pokemon";

const PokemonDetailPage = () => {
  const {pokemonName} = useParams<{pokemonName: string}>();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => {
        console.error("Błąd:", err);
        setError(true);
      });
  }, [pokemonName]);

  if (error) {
    return <FailedApiLoadError />;
  }
  if (!pokemon) {
    return <div className='w-screen h-screen  absolute'>Loading...</div>;
  }

  const {name, abilities, height, moves, stats, types, weight, sprites, id, base_experience, is_default} = pokemon;
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default;
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col '>
      <div className='absolute top-0 left-0 w-full p-6'>
        <Logo />
      </div>
      <div className='flex flex-col md:flex-row max-w-[1150px] w-full items-center'>
        <div className='w-[60%]  px-12'>
          <div className='flex space-x-3 items-center'>
            <Link
              to='/'
              className='bg-gray-200 rounded-full p-1 hover:scale-110 duration-300 group hover:bg-[var(--color-primary)]'
            >
              <div className='rotate-180 group-hover:text-white'>
                <SvgArrow />
              </div>
            </Link>
            <h1 className='mt-0 font-bold text-3xl capitalize'>{name}</h1>
          </div>

          <h2 className=' mt-6'>Abilities</h2>
          <div className='flex space-x-4 mt-4 text-gray-700'>
            {abilities.map((ability) => (
              <div className='p-2 bg-gray-200 px-6 font-semibold rounded-lg capitalize'>{ability.ability?.name}</div>
            ))}
          </div>
          <h2 className=' mt-6'>Moves</h2>
          <div className='flex space-x-4 mt-4 text-gray-700'>
            {moves.slice(0, 3).map((move) => (
              <div className='p-2 bg-gray-200 rounded-lg font-semibold px-6 capitalize'>{move.move?.name}</div>
            ))}
          </div>
          <div className='flex flex-col mt-10'>
            {stats.map((s) => (
              <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </div>
        {/* //POKEMON CARD */}
        <div
          className='w-[40%] h-[660px] flex flex-col items-center 
        justify-center  rounded-[40px]  '
          style={{
            backgroundImage: `linear-gradient(to bottom, white 40%, ${getTypeColor(types[0].type.name)})`,
          }}
        >
          <span className='font-semibold text-xl mt-6'>#{id}</span>
          <img src={imageUrl} className='w-[60%] max-h-full object-cover mt-6' />
          <div className='w-full bg-white h-full rounded-[40px] flex items-center justify-center flex-col space-y-4'>
            <h1 className='text-xl font-bold capitalize mt-6'>{name}</h1>
            <div className='flex space-x-4'>
              {types.map((t) => (
                <div
                  style={{backgroundColor: getTypeColor(t.type.name)}}
                  className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)] font-bold text-md uppercase'
                >
                  {t.type.name}
                </div>
              ))}
            </div>
            <div className='grid grid-cols-2 gap-y-4 gap-x-12 font-semibold text-center text-[#5D5D5D] mt-2'>
              <div className='flex flex-col '>
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
                <span className='text-[#A2A2A2]'>Default</span>
                <span>{is_default ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type StatBarProps = {
  label: string;
  value: number;
};

const StatBar = ({label, value}: StatBarProps) => {
  const percentage = Math.min((value / 255) * 100, 100);

  const colorMap: Record<string, string> = {
    hp: "bg-green-200 ",
    attack: "bg-red-200",
    defense: "bg-yellow-200",
    "special-attack": "bg-purple-200",
    "special-defense": "bg-indigo-200",
    speed: "bg-pink-200",
  };

  const barColor = colorMap[label.toLowerCase()] || "bg-gray-200";

  return (
    <div className='mb-3'>
      <div className='flex justify-between mb-1 text-sm font-medium text-gray-700 capitalize'>
        <span className='font-bold'>{label}</span>
        <span>{value}</span>
      </div>
      <div className='w-full h-4 bg-gray-200 rounded'>
        <div className={`h-full ${barColor} rounded transition-all duration-300`} style={{width: `${percentage}%`}} />
      </div>
    </div>
  );
};

export default PokemonDetailPage;
