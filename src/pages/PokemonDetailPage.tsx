import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FailedApiLoadError from "../components/FailedApiLoadError";
import DetailPageSkeleton from "../components/DetailPageSkeleton";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import {SvgArrow} from "../components/SvgArrow";
import {StatBar} from "../components/StatBar";
import {Link} from "react-router-dom";
import type {Pokemon} from "../types/pokemon";
import Abilities from "../components/Abilities";
import InfoCard from "../components/InfoCard";
import Moves from "../components/Moves";

const PokemonDetailPage = () => {
  const {pokemonName} = useParams<{pokemonName: string}>();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => {
        console.error("Error:", err);
        setError(true);
      });
  }, [pokemonName]);

  if (error) return <FailedApiLoadError />;
  if (!pokemon) return <DetailPageSkeleton />;

  const {name, abilities, height, moves, stats, types, weight, id, base_experience} = pokemon;
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default;

  return (
    <div className='w-full md:h-screen flex justify-center items-center flex-col px-12 md:px-0 pb-20 relative'>
      <div className='absolute top-0 left-0 w-full p-6 py-4'>
        <Logo />
      </div>

      <div className='flex flex-col-reverse md:flex-row max-w-[1150px] mt-6 w-full items-center'>
        <div className='md:w-[60%] px-0 md:px-12 mt-10 md:mt-0 pb-20 md:pb-0'>
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

          <Abilities abilities={abilities} />
          <Moves moves={moves} />

          <div className='flex flex-col mt-10'>
            {stats.map((s) => (
              <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
            ))}
          </div>
        </div>

        <InfoCard
          id={id}
          imageUrl={imageUrl}
          types={types}
          weight={weight}
          height={height}
          base_experience={base_experience}
          movesCount={moves.length}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PokemonDetailPage;
