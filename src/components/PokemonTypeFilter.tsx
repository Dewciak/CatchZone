import {useContext} from "react";
import {SearchFilterContext} from "../pages/Homepage";

const PokemonTypeFilter = () => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    return null;
  }
  const {selectedTypes, handleTypeButton} = context;

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

  return (
    <div className='flex flex-col'>
      <span>Filter page by type</span>
      <button
        onClick={() => handleTypeButton("All types")}
        className={`p-3 border text-left capitalize border-[#E5E9F1] rounded-md w-full mt-2  ${
          selectedTypes.includes("All types") ? "bg-[#F3270F] text-white" : ""
        }`}
      >
        All types
      </button>
      <div className='flex mt-2 flex-wrap gap-2 2xl:h-[600px] h-[170px] overflow-auto '>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeButton(type)}
            className={`p-3 border text-left capitalize border-[#E5E9F1] rounded-md w-full  ${
              selectedTypes.includes(type) ? "bg-[#F3270F] text-white" : ""
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonTypeFilter;
