import axios from "axios";
import {useContext, useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonCard from "./PokemonCard";

import Close from "../assets/images/close.png";
import {SearchFilterContext} from "../pages/Homepage";
import FailedApiLoadError from "./FailedApiLoadError";
import Pagination from "./Pagination";
import CardSkeleton from "./CardSkeleton";
import PokemonPerPageSelect from "./PokemonPerPageSelect";

const PokemonList = () => {
  // States for fetching data and error handling
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState<number>(20);
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
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`);
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
  }, [currentPage, pokemonsPerPage]);

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
  if (error) {
    return <FailedApiLoadError />;
  }

  if (pokemons.length === 0) {
    return (
      <div className='w-full mx-auto md:mt-48 mt-32 pb-32 max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px] text-center md:text-right px-12 md:px-0'>
        <div className='text-2xl font-semibold text-gray-400 flex space-x-2 items-center justify-center'>
          <span>Loading...</span>
          <div className='w-4 h-4 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin' />
        </div>
        <div className='grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 mt-16 place-items-center'>
          {Array.from({length: pokemonsPerPage}, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  // Main UI
  return (
    <div className='w-full mx-auto md:mt-32 mt-32   pb-32 max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px]  text-center md:text-right '>
      <span className='text-3xl '>{visiblePokemons.length} Pokemons found</span>
      <div className='flex   mt-6  md:h-[50px] text w-full  py-6 md:justify-between  md:items-center items-start px-12 md:px-0 md:mt-10 flex-col md:flex-row space-y-6'>
        <div className='flex items-center space-x-4 '>
          <span>Selected:</span>
          {selectedTypes.map((pokemonType, index) => (
            <div className='relative' key={index}>
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

        <PokemonPerPageSelect
          value={pokemonsPerPage}
          onChange={(value) => {
            setPokemonsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <ul className='grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3  gap-10 mt-10 place-items-center  '>
        {visiblePokemons.map((item, index) => (
          <li key={index}>
            <PokemonCard pokemon={item} />
          </li>
        ))}
      </ul>
      <div className='mt-24'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default PokemonList;
