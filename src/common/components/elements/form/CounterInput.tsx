import { OutlineButton } from '../button';

type Props = {
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

const CounterInput: React.FC<Props> = ({ count, onDecrement, onIncrement }) => {
  return (
    <div className="flex">
      <OutlineButton
        onClick={onDecrement}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-600 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 pb-1"
      >
        -
      </OutlineButton>
      <input
        id="counter"
        aria-label="input"
        className="border border-gray-300 h-full text-center w-14 pb-1 rounded-md"
        type="text"
        value={count}
        onChange={(e) => e.target.value}
      />
      <OutlineButton
        onClick={onIncrement}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-600 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 pb-1 "
      >
        +
      </OutlineButton>
    </div>
  );
};

export default CounterInput;
