import React from "react";

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="rounded flex bg-white">
      <div className="text-3x1 flex justify-center items-center bg-sky-600 text-white px-4">
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-1g font-semibold">{text}</p>
        <p className="text-x1 font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
