import type {Pokemon} from "../types/pokemon";

const Abilities = ({abilities}: {abilities: Pokemon["abilities"]}) => (
  <>
    <h2 className='mt-6'>Abilities</h2>
    <div className='flex flex-wrap gap-4 mt-4 text-gray-700'>
      {abilities.map((ability, index) => (
        <div
          key={index}
          className='p-2 bg-gray-200 px-6 font-semibold rounded-lg capitalize flex items-center justify-center'
        >
          <p className='whitespace-nowrap'>{ability.ability?.name}</p>
        </div>
      ))}
    </div>
  </>
);

export default Abilities;
