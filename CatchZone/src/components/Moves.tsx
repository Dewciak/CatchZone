import type {Pokemon} from "../types/pokemon";

const Moves = ({moves}: {moves: Pokemon["moves"]}) => (
  <>
    <h2 className='mt-6'>Moves</h2>
    <div className='flex flex-wrap gap-4 mt-4 text-gray-700'>
      {moves.slice(0, 3).map((move, index) => (
        <div
          key={index}
          className='p-2 bg-gray-200 rounded-lg font-semibold px-6 capitalize flex items-center justify-center'
        >
          <p className='whitespace-nowrap'>{move.move?.name}</p>
        </div>
      ))}
    </div>
  </>
);

export default Moves;
