import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface Pokemon {
  name: string;
}

function Homepage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.error("Błąd:", err));
  }, []);
  return (
    <div className='max-w-[1200px] mx-auto mt-32'>
      <ul className='w-full space-y-4 text-(--color-text)'>
        {pokemons.map((item, index) => (
          <li key={index} className='border p-2 rounded-lg'>
            <Link to={`/${item}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
