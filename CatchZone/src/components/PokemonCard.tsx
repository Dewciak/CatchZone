import type {Pokemon} from "../pages/Homepage";
import {Link} from "react-router-dom";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({pokemon: {name}}: Props) => {
  return (
    <Link to={`/pokemon/${name}`} className='flex flex-col border p-2 rounded-lg w-[300px] h-[400px] '>
      <span>{name}</span>
    </Link>
  );
};

export default PokemonCard;
