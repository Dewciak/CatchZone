import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import FailedApiLoadError from "../components/FailedApiLoadError";
import getTypeColor from "../components/GetTypeColor";
import Logo from "../components/Logo";
import {SvgArrow} from "../components/SvgArrow";
import type {Pokemon} from "../types/pokemon";
import {StatBar} from "../components/StatBar";

const PokemonDetailPage = () => {
  // Get the pokemon name from the URL
  const {pokemonName} = useParams<{pokemonName: string}>();

  // State to store fetched Pokemon data
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<boolean>(false);

  // Fetch the Pokemon data when the component loads or when the name changes
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => {
        console.error("Error:", err);
        setError(true);
      });
  }, [pokemonName]);

  // Show error if fetch failed
  if (error) {
    return <FailedApiLoadError />;
  }

  // Show loading screen while data is being fetched
  if (!pokemon) {
    return <div className='w-screen h-screen absolute'>Loading...</div>;
  }

  // Destructure the Pokemon data
  const {name, abilities, height, moves, stats, types, weight, id, base_experience} = pokemon;

  // Select best available image
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className='w-full h-screen flex justify-center items-center flex-col '>
      {/* Logo at the top */}
      <div className='absolute top-0 left-0 w-full p-6'>
        <Logo />
      </div>

      <div className='flex flex-col md:flex-row max-w-[1150px] w-full items-center'>
        {/* Left side – details */}
        <div className='w-[60%] px-12'>
          <div className='flex space-x-3 items-center'>
            {/* Back button */}
            <Link
              to='/'
              className='bg-gray-200 rounded-full p-1 hover:scale-110 duration-300 group hover:bg-[var(--color-primary)]'
            >
              <div className='rotate-180 group-hover:text-white'>
                <SvgArrow />
              </div>
            </Link>
            {/* Pokemon name */}
            <h1 className='mt-0 font-bold text-3xl capitalize'>{name}</h1>
          </div>

          {/* Abilities */}
          <h2 className='mt-6'>Abilities</h2>
          <div className='flex space-x-4 mt-4 text-gray-700'>
            {abilities.map((ability, index) => (
              <div key={index} className='p-2 bg-gray-200 px-6 font-semibold rounded-lg capitalize'>
                {ability.ability?.name}
              </div>
            ))}
          </div>

          {/* Moves (limited to 3) */}
          <h2 className='mt-6'>Moves</h2>
          <div className='flex space-x-4 mt-4 text-gray-700'>
            {moves.slice(0, 3).map((move, index) => (
              <div key={index} className='p-2 bg-gray-200 rounded-lg font-semibold px-6 capitalize'>
                {move.move?.name}
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className='flex flex-col mt-10'>
            {stats.map((s) => (
              <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </div>

        {/* Right side – image and info card */}
        <div
          className='w-[40%] h-[660px] flex flex-col items-center justify-center rounded-[40px]'
          style={{
            backgroundImage: `linear-gradient(to bottom, white 40%, ${getTypeColor(types[0].type.name)})`,
          }}
        >
          {/* Pokemon ID */}
          <span className='font-semibold text-xl mt-6'>#{id}</span>

          {/* Pokemon image */}
          <img src={imageUrl} className='w-[60%] max-h-full object-cover mt-6' />

          {/* Info card */}
          <div className='w-full bg-white h-full rounded-[40px] flex items-center justify-center flex-col space-y-4'>
            {/* Pokemon name */}
            <h1 className='text-xl font-bold capitalize mt-6'>{name}</h1>

            {/* Type badges */}
            <div className='flex space-x-4'>
              {types.map((t, index) => (
                <div
                  key={index}
                  style={{backgroundColor: getTypeColor(t.type.name)}}
                  className='p-2 rounded-[5px] text-[hsla(0,0%,0%,0.8)] font-bold text-md uppercase'
                >
                  {t.type.name}
                </div>
              ))}
            </div>

            {/* Basic info (weight, height, exp, etc.) */}
            <div className='grid grid-cols-2 gap-y-4 gap-x-12 font-semibold text-center text-gray-700 mt-2'>
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
                <span>{moves.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats bar component

export default PokemonDetailPage;
