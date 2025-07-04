import PokemonList from "../components/PokemonList";

export interface Pokemon {
  name: string;
}

function Homepage() {
  return (
    <div className='flex flex-col'>
      <PokemonList />
    </div>
  );
}

export default Homepage;
