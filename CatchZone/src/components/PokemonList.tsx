import axios from "axios";
import {useContext, useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonCard from "./PokemonCard";

import Close from "../assets/images/close.png";
import {SearchFilterContext} from "../layouts/RootLayout";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<boolean>(false);

  const context = useContext(SearchFilterContext);
  if (!context) {
    return null;
  }
  const {search, selectedTypes, setSelectedTypes} = context;

  // Fetch full data of 100 Pokémons on initial load
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        const detailed = await Promise.all(
          res.data.results.map((item: {url: string}) => axios.get(item.url).then((res) => res.data))
        );
        setPokemons(detailed);
      } catch (err) {
        console.error("Błąd:", err);
        setError(true);
      }
    };

    fetchPokemons();
  }, []);

  // Filter Pokémon list by search query and exact type match (0–2 types)
  const visiblePokemons = pokemons.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search?.toLowerCase() || "");
    const pokemonTypes = item.types.map((t) => t.type.name);

    if (selectedTypes.includes("All types")) {
      return nameMatch; // jeśli "All types", filtruj tylko po nazwie
    }

    if (selectedTypes.length === 0) return false;

    const matchesTypes = selectedTypes.every((type) => pokemonTypes.includes(type));
    return nameMatch && matchesTypes;
  });

  // Handle type selection (max 2 types can be selected)

  // Show loading or error messages
  if (pokemons.length === 0) {
    return <div className='w-screen h-screen bg-red-500'>Loading...</div>;
  }
  if (error) {
    return <div>Błąd</div>;
  }

  // Main UI
  return (
    <div className='w-full mx-auto mt-16 2xl:px-32 px-16'>
      <span className='text-3xl'>{visiblePokemons.length} Pokemons found</span>
      <div className='flex space-x-4 h-[50px] items-center text w-full  py-6 justify-start mt-6 '>
        <span>Selected:</span>
        {selectedTypes.map((pokemonType) => (
          <div className='relative'>
            <span className='p-2  flex border rounded-md border-[var(--color-border)] text-[#525863] capitalize'>
              {pokemonType}
            </span>
            <button
              onClick={() => setSelectedTypes((prev) => prev.filter((type) => type !== pokemonType))}
              className='absolute -right-1 -top-1 w-[10px]  h-[10px] cursor-pointer'
            >
              <img src={Close} alt='close' />
            </button>
          </div>
        ))}
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-10 mt-16'>
        {visiblePokemons.map((item, index) => (
          <li key={index}>
            <PokemonCard pokemon={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
