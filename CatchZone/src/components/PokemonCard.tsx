import type {Pokemon} from "../types/pokemon";
import {Link} from "react-router-dom";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon: {name, sprites}}: Props) => {
  return (
    <Link to={`/pokemon/${name}`} className='flex flex-col border p-2 rounded-lg w-[300px] h-[400px] '>
      <span>{name}</span>
      {sprites?.front_default ? <img src={sprites.front_default} alt={`${name} sprite`} /> : <span>Brak obrazka</span>}
    </Link>
  );
};

export default PokemonCard;
