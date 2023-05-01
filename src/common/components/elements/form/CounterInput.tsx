import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';

type Props = {
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const CounterInput: React.FC<Props> = ({ count, onDecrement, onIncrement }) => {
  return (
    <div className="flex">
      <MinusSmIcon
        onClick={onDecrement}
        className="w-7 h-7 text-gray-500 rounded-md cursor-pointer border border-gray-300 border-r-0"
      />
      <input
        id="counter"
        aria-label="input"
        className="border border-gray-300 h-full text-center w-12 pb-1 rounded-lg"
        type="text"
        value={count}
        onChange={(e) => e.target.value}
      />
      <PlusSmIcon
        onClick={onIncrement}
        className="w-8 h-7 text-gray-500 rounded-md cursor-pointer border border-gray-300 border-l-0"
      />
    </div>
  );
};

export default CounterInput;
