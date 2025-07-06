type StatBarProps = {
  label: string;
  value: number;
};

export const StatBar = ({label, value}: StatBarProps) => {
  // Convert value to percentage (max 255)
  const percentage = Math.min((value / 255) * 100, 100);

  // Define color for each stat
  const colorMap: Record<string, string> = {
    hp: "bg-green-200",
    attack: "bg-red-200",
    defense: "bg-yellow-200",
    "special-attack": "bg-purple-200",
    "special-defense": "bg-indigo-200",
    speed: "bg-pink-200",
  };

  const barColor = colorMap[label.toLowerCase()] || "bg-gray-200";

  return (
    <div className='mb-3'>
      {/* Label and value */}
      <div className='flex justify-between mb-1 text-sm font-medium text-gray-700 capitalize'>
        <span className='font-bold'>{label}</span>
        <span>{value}</span>
      </div>
      {/* Stat bar */}
      <div className='w-full h-4 bg-gray-200 rounded'>
        <div className={`h-full ${barColor} rounded transition-all duration-300`} style={{width: `${percentage}%`}} />
      </div>
    </div>
  );
};
