import React from "react";
import { useCountUp } from 'react-countup';

interface Props {
  id: string;// should be unique
  title: string;
  value: number;
}

function Card(props: Props) {
  const { id, title, value } = props

  const Counter = () => {
    useCountUp({ ref: id, end: value, duration: 5 });
    return <span id={id} />;
  };

  return (
    <div className="p-4 border rounded-lg  shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>
      {/* <p className="text-xl font-bold">{value}</p> */}
      <p className="text-2xl font-bold">
        <Counter />
      </p>
    </div>
  );
}

export default React.memo(Card)
