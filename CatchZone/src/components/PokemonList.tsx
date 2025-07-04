import axios from "axios";
import {useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        const detailed = await Promise.all(
          res.data.results.map((item: {url: string}) => axios.get(item.url).then((res) => res.data))
        );
        setPokemons(detailed);
      } catch (err) {
        console.error("Błąd:", err);
      }
    };

    fetchPokemons();
  }, []);

  const visiblePokemons = pokemons.filter((item) => {
    const pokemonTypes = item.types.map((t) => t.type.name).sort();
    const selected = [...selectedTypes].sort();

    const matchesName = item.name.toLowerCase().includes(search?.toLowerCase() || "");
    const matchesTypes =
      selected.length === 0 ||
      (selected.length === pokemonTypes.length && selected.every((type, index) => type === pokemonTypes[index]));

    return matchesName && matchesTypes;
  });

  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  const handleTypeButton = (type: string) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }

      if (prev.length < 2) {
        return [...prev, type];
      }

      return prev;
    });
  };

  return (
    <div className='max-w-[1400px] mx-auto mt-32'>
      <input type='text' className='py-2 w-full bg-white text-black px-2' onChange={(e) => setSearch(e.target.value)} />

      <div className='flex space-x-6'>
        <div className='flex mt-10 flex-wrap gap-6'>
          {types.map((type) => (
            <button
              onClick={() => handleTypeButton(type)}
              className={`p-6 border rounded-full items-center w-[120px] text-center ${
                selectedTypes.includes(type) && "bg-red-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ul className='w-[1320px]  space-y-4 text-(--color-text) mt-32 flex flex-wrap gap-10  items-center justify-start'>
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
