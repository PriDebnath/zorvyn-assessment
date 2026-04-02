import React from "react";

interface Props{
    title: string; 
    value: number;
}

function Card(props:Props) {
  const { title, value } = props
  return (
    <div className="p-4 border rounded-lg  shadow-sm">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold">₹ {value}</p>
    </div>
  );
}

export default  React.memo(Card)
