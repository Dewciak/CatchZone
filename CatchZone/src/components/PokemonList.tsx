import axios from "axios";
import {useEffect, useState} from "react";
import type {Pokemon} from "../pages/Homepage";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.error("Błąd:", err));
  }, []);
  return (
    <div className='max-w-[1200px] mx-auto mt-32'>
      <ul className='w-full space-y-4 text-(--color-text) flex flex-wrap gap-10  items-center justify-center'>
        {pokemons.map((item, index) => (
          <li key={index}>
            <PokemonCard pokemon={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
