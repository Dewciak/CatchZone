import axios from "axios";
import {useContext, useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonListCard from "./PokemonListCard";

import Close from "../assets/images/close.png";
import {SearchFilterContext} from "../pages/Homepage";
import FailedApiLoadError from "./FailedApiLoadError";
import Pagination from "./Pagination";
import PokemonPerPageSelect from "./PokemonPerPageSelect";
import ListSkeleton from "./ListSkeleton";

const PokemonList = () => {
  // States for fetching data and error handling
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState<boolean>(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState<number>(20);
  const [totalMatchingPokemons, setTotalMatchingPokemons] = useState<number>(1302);

  const totalPages = Math.ceil(totalMatchingPokemons / pokemonsPerPage);

  const offset = (currentPage - 1) * pokemonsPerPage;

  // Context for filtering and searching
  const context = useContext(SearchFilterContext);
  if (!context) {
    return null;
  }
  const {search, selectedTypes, setSelectedTypes} = context;

  // Fetch full data of 100 Pokemons on initial load
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

  useEffect(() => {
    if (selectedTypes.includes("All types")) {
      setTotalMatchingPokemons(1302); // full dex
    } else {
      setTotalMatchingPokemons(visiblePokemons.length);
    }
  }, [visiblePokemons, selectedTypes]);

  // Show loading or error messages
  if (error) {
    return <FailedApiLoadError />;
  }

  if (pokemons.length === 0) {
    return <ListSkeleton pokemonsPerPage={pokemonsPerPage} />;
  }
  // Main UI
  return (
    <div className='w-full relative mx-auto md:mt-32 mt-32   pb-32 max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px]  text-center md:text-right '>
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
            <PokemonListCard pokemon={item} />
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
