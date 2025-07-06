import Navbar from "../components/Navbar";
import PokemonList from "../components/PokemonList";
import {createContext, useState} from "react";

interface SearchFilterContextType {
  search: string | undefined;
  setSearch: (value: string | undefined) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  handleTypeButton: (value: string) => void;
}

export const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

function Homepage() {
  const [search, setSearch] = useState<string | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All types"]);

  const handleTypeButton = (type: string) => {
    setSelectedTypes((prev) => {
      // if type is already selected, remove it
      if (prev.includes(type)) return prev.filter((t) => t !== type);

      // if All types is clicked, reset and select only it
      if (type === "All types") return ["All types"];

      // if All types is already selected, replace it with the new type
      if (prev.includes("All types")) return [type];

      // if already 2 types selected, ignore selections
      if (prev.length >= 2) return prev;

      // otherwise, add the selected type
      return [...prev, type];
    });
  };
  return (
    <div className='flex w-full'>
      <SearchFilterContext.Provider value={{search, setSearch, selectedTypes, setSelectedTypes, handleTypeButton}}>
        <Navbar />
        <PokemonList />
      </SearchFilterContext.Provider>
    </div>
  );
}

export default Homepage;
