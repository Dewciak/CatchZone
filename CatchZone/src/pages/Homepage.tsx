import PokemonList from "../components/PokemonList";

export interface Pokemon {
  name: string;
  image: string;
}

function Homepage() {
  return (
    <div className='flex w-full'>
      <PokemonList />
    </div>
  );
}

export default Homepage;
