import axios from "axios";
import {useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import {useParams} from "react-router-dom";
import FailedApiLoadError from "../components/FailedApiLoadError";

const PokemonDetailPage = () => {
  const {pokemonName} = useParams<{pokemonName: string}>();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemsson/${pokemonName}`)
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

  const {name, abilities, height, moves, stats, types, weight} = pokemon;

  return (
    <div className='max-w-[600px] h-screen  flex items-center flex-col space-y-10 '>
      <p>{name}</p>

      <p>height: {height} </p>
      <p>weight: {weight}</p>
      {moves.map((e) => (
        <p>{e.move.name}</p>
      ))}

      {abilities.map((e) => (
        <p className='border p-2 bg-yellow-500'>{e.ability?.name || ""}</p>
      ))}

      {stats.map((e) => (
        <p className='border p-2 bg-red-500'>{e.stat.name}</p>
      ))}

      {types.map((e) => (
        <p className='border p-2 bg-blue-500'>{e.type.name}</p>
      ))}
    </div>
  );
};

export default PokemonDetailPage;
