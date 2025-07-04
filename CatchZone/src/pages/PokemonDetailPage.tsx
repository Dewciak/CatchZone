import axios from "axios";
import {useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import {useParams} from "react-router-dom";

const PokemonDetailPage = () => {
  const {pokemonName} = useParams<{pokemonName: string}>();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error("Błąd:", err));
  }, [pokemonName]);

  if (!pokemon) return <div>Loading...</div>;

  const {name} = pokemon;

  return <div className='w-full h-screen  flex items-center'>{name}</div>;
};

export default PokemonDetailPage;
