import {useContext} from "react";
import {SearchFilterContext} from "../pages/Homepage";

const SearchInput = () => {
  const context = useContext(SearchFilterContext);
  if (!context) {
    return null;
  }
  const {search, setSearch} = context;

  return (
    <input
      type='text'
      className='py-3 w-full bg-white text-black px-2 border  rounded-md border-[#E5E9F1]'
      placeholder='🔍  Search pokemon name...'
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchInput;
