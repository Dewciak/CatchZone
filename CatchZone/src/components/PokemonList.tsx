import axios from "axios";
import {useEffect, useState} from "react";
import type {Pokemon} from "../types/pokemon";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [filtered, setFiltered] = useState<Pokemon[]>([]);

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
      }
    };

    fetchPokemons();
  }, []);

  const visiblePokemons = pokemons.filter((item) => item.name.toLowerCase().includes(search?.toLowerCase() || ""));

  return (
    <div className='max-w-[1400px] mx-auto mt-32'>
      <input type='text' className='py-2 w-full bg-white text-black px-2' onChange={(e) => setSearch(e.target.value)} />
      <select className='mt-16' onChange={(e) => console.log(e.target.value)}>
        <option value='fire'>Fire</option>
        <option value='water'>Water</option>
        <option value='grass'>Grass</option>
      </select>
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
