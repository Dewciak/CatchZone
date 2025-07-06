type Props = {
  value: number;
  onChange: (value: number) => void;
};

const PokemonPerPageSelect = ({value, onChange}: Props) => {
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
        {[20, 40, 60, 80, 100].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonPerPageSelect;
