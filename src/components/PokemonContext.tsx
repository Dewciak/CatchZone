import {createContext, useContext, useState, type ReactNode} from "react";

export type PartialPokemon = {
  name: string;
  types: string[];
  sprite: string;
};

type PokemonContextType = {
  pokemons: PartialPokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<PartialPokemon[]>>;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext must be used inside PokemonProvider");
  return context;
};

export const PokemonProvider = ({children}: {children: ReactNode}) => {
  const [pokemons, setPokemons] = useState<PartialPokemon[]>([]);

  return <PokemonContext.Provider value={{pokemons, setPokemons}}>{children}</PokemonContext.Provider>;
};
