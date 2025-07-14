type Props = {
  value: number;
  onChange: (value: number) => void;
  maxAvailable: number;
};

const PokemonPerPageSelect = ({value, onChange, maxAvailable}: Props) => {
  const options = [20, 40, 60, 80, 100];

  return (
    <div className='flex space-x-4 items-center'>
      <span>Per page:</span>
      <select
        className='border px-3 py-2 rounded-md bg-white text-gray-700'
        value={value}
        onChange={(e) => {
          onChange(parseInt(e.target.value));
        }}
      >
        {options.map((num) => (
          <option key={num} value={num} disabled={num > maxAvailable}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonPerPageSelect;
