import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PokemonList from "../components/PokemonList";
import {createContext, useState} from "react";

interface SearchFilterContextType {
  search: string | undefined;
  setSearch: (value: string | undefined) => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  handleTypeButton: (value: string) => void;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
}

export const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

function Homepage() {
  const [search, setSearch] = useState<string | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["All types"]);
  const [visibleCount, setVisibleCount] = useState<number>(0);

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
    <div className='flex w-full relative'>
      <SearchFilterContext.Provider
        value={{
          search,
          setSearch,
          selectedTypes,
          setSelectedTypes,
          handleTypeButton,
          visibleCount,
          setVisibleCount,
        }}
      >
        <Navbar />
        <div className='flex flex-col w-full relative max-w-[500px] 2xl:max-w-[1100px] lg:max-w-[700px] mx-auto px-4'>
          <main>
            <PokemonList />
          </main>
          <Footer />
        </div>
      </SearchFilterContext.Provider>
    </div>
  );
}

export default Homepage;
