type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const HamburgerButton = ({isOpen, onClick}: Props) => {
  return (
    <button
      onClick={onClick}
      className='w-[45px] h-[45px] p-2 rounded-md flex flex-col justify-center items-center space-y-2 cursor-pointer'
    >
      <span
        className={`w-full h-[3px] bg-black rounded-full transition-transform duration-300 origin-left ${
          isOpen ? "rotate-45 translate-y-[0px] ml-2" : ""
        }`}
      />
      <span
        className={`w-full h-[3px] bg-black rounded-full transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`w-full h-[3px] bg-black rounded-full transition-transform duration-300 origin-left ${
          isOpen ? "-rotate-45 -translate-y-[0px] ml-2" : ""
        }`}
      />
    </button>
  );
};

export default HamburgerButton;
