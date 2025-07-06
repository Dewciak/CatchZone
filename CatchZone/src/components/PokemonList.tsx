import axios from "axios";
import {useContext, useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonCard from "./PokemonCard";

import Close from "../assets/images/close.png";
import {SearchFilterContext} from "../layouts/RootLayout";
import FailedApiLoadError from "./FailedApiLoadError";
import Pagination from "./Pagination";
import CardSkeleton from "./CardSkeleton";

const PokemonList = () => {
  // States for fetching data and error handling
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 21;
  const totalPokemons = 1302;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
  const offset = (currentPage - 1) * pokemonsPerPage;

  // Context for filtering and searching
  const context = useContext(SearchFilterContext);
  if (!context) {
    return null;
  }
  const {search, selectedTypes, setSelectedTypes} = context;

  // Fetch full data of 100 Pokémons on initial load
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokem2on?limit=${pokemonsPerPage}&offset=${offset}`);
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
  }, [currentPage]);

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
  // if (error) {
  //   return <FailedApiLoadError />;
  // }

  const skeletonsNumber = 21;

  if (pokemons.length === 0) {
    return (
      <div className='w-full h-screen  mt-32 mx-auto 2xl:px-32 px-16 '>
        <div className='text-2xl bold text-gray-400 flex space-x-2 items-center'>
          <span>Loading...</span>
          <div className='w-4 h-4 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin' />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 mt-16 md:grid-cols-3  gap-10'>
          {Array.from({length: 21}, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className='w-full mx-auto mt-16 2xl:px-32 px-16 pb-32'>
      <span className='text-3xl'>{visiblePokemons.length} Pokemons found</span>
      <div className='flex  mt-6  h-[50px] items-center text w-full  py-6 justify-between'>
        <div className='flex items-center space-x-4 '>
          <span>Selected:</span>
          {selectedTypes.map((pokemonType) => (
            <div className='relative'>
              <span className='p-2  flex border rounded-md border-[var(--color-border)] text-[#525863] capitalize'>
                {pokemonType}
              </span>
              <button
                onClick={() => setSelectedTypes((prev) => prev.filter((type) => type !== pokemonType))}
                className='absolute -right-1 -top-1 w-[12px]  h-[12px] flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'
              >
                <img src={Close} alt='close' className=' w-[8px] h-[8px] ' />
              </button>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
