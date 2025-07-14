import axios from "axios";
import {useContext, useEffect, useMemo, useRef, useState} from "react";

// Components
import PokemonListCard from "./PokemonListCard";
import Close from "../assets/images/close.png";
import FailedApiLoadError from "./FailedApiLoadError";
import Pagination from "./Pagination";
import PokemonPerPageSelect from "./PokemonPerPageSelect";
import ListSkeleton from "./ListSkeleton";

// Contexts
import {SearchFilterContext} from "../pages/Homepage";
import {usePokemonContext} from "./PokemonContext";

// Types
type PartialPokemon = {
  name: string;
  types: string[];
  sprite: string;
};

const PokemonList = () => {
  const {pokemons, setPokemons} = usePokemonContext();
  const fetched = useRef<PartialPokemon[]>([]);

  // Pagination and error state
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
  const offset = (currentPage - 1) * pokemonsPerPage;

  // Search/filter context from Homepage
  const context = useContext(SearchFilterContext);
  if (!context) return null;
  const {search, selectedTypes, setSelectedTypes} = context;

  // Fetch all Pokémon data only once
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // 1. Jeśli już mamy dane – nie pobieraj ponownie
        if (pokemons.length > 0) return;

        // 2. Pobierz pierwsze 20
        const initialRes = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
        const initialDetailed: PartialPokemon[] = await Promise.all(
          initialRes.data.results.map((item: {url: string}) =>
            axios.get(item.url).then((res) => ({
              name: res.data.name,
              types: res.data.types.map((t: any) => t.type.name),
              sprite:
                res.data.sprites.other?.["official-artwork"]?.front_default ||
                res.data.sprites.other?.home?.front_default ||
                res.data.sprites.front_default,
            }))
          )
        );

        fetched.current = initialDetailed;
        setPokemons(initialDetailed); // natychmiast wyświetl

        // 3. Pobierz pozostałe w tle
        const countRes = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1");
        const maxPokemons = countRes.data.count;

        for (let offset = 20; offset < maxPokemons; offset += 100) {
          const batchRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`);
          const batchDetailed: PartialPokemon[] = await Promise.all(
            batchRes.data.results.map((item: {url: string}) =>
              axios.get(item.url).then((res) => ({
                name: res.data.name,
                types: res.data.types.map((t: any) => t.type.name),
                sprite: res.data.sprites.front_default,
              }))
            )
          );

          fetched.current = [...fetched.current, ...batchDetailed];
          setPokemons([...fetched.current]); // aktualizuj na bieżąco
        }
      } catch (err) {
        console.error("Error while fetching Pokémons:", err);
        setError(true);
      }
    };

    fetchPokemons();
  }, [pokemons.length, setPokemons]);

  // Filter Pokémons based on name and types
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(search?.toLowerCase() || "");

      const matchesTypes = selectedTypes.includes("All types")
        ? true
        : selectedTypes.length === 0
        ? false
        : selectedTypes.every((type) => item.types.includes(type));

      return nameMatch && matchesTypes;
    });
  }, [pokemons, search, selectedTypes]);

  // Slice visible Pokémons for current page
  const paginatedPokemons = useMemo(() => {
    return filteredPokemons.slice(offset, offset + pokemonsPerPage);
  }, [filteredPokemons, offset, pokemonsPerPage]);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  // Loading and error handling
  if (error) return <FailedApiLoadError />;
  if (pokemons.length === 0) return <ListSkeleton pokemonsPerPage={pokemonsPerPage} />;

  return (
    <div className='w-full relative mx-auto md:mt-32 mt-32 pb-32 max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px] text-center md:text-right'>
      {(search || !selectedTypes.includes("All types")) && (
        <span className='text-2xl'>{filteredPokemons.length} matching Pokémons found</span>
      )}

      {/* Filter display and items-per-page selector */}
      <div className='flex mt-6 md:h-[50px] w-full py-6 md:justify-between md:items-center items-start px-12 md:px-0 md:mt-10 flex-col md:flex-row space-y-6'>
        <div className='flex items-center space-x-4'>
          <span>Selected:</span>
          {selectedTypes.map((pokemonType, index) => (
            <div className='relative' key={index}>
              <span className='p-2 flex border rounded-md border-[var(--color-border)] text-[#525863] capitalize'>
                {pokemonType}
              </span>
              <button
                onClick={() => setSelectedTypes((prev) => prev.filter((type) => type !== pokemonType))}
                className='absolute -right-1 -top-1 w-[12px] h-[12px] flex items-center justify-center bg-gray-200 rounded-full cursor-pointer'
              >
                <img src={Close} alt='close' className='w-[8px] h-[8px]' />
              </button>
            </div>
          ))}
        </div>

        <PokemonPerPageSelect
          value={pokemonsPerPage}
          onChange={(value) => {
            setPokemonsPerPage(value);
            setCurrentPage(1); // Reset to first page
          }}
          maxAvailable={filteredPokemons.length}
        />
      </div>

      {/* Pokémon cards */}
      <ul className='grid sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 mt-10 place-items-center'>
        {paginatedPokemons.map((item, index) => (
          <li key={index}>
            <PokemonListCard pokemon={item} index={index} />
          </li>
        ))}
      </ul>

      {/* Pagination only when something is selected and multiple pages exist */}
      {selectedTypes.length !== 0 && totalPages > 1 && (
        <div className='mt-24'>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  );
};

export default PokemonList;
