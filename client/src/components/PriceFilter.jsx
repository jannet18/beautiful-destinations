import React from "react";

function PriceFilter({ selectedPrice, onChange }) {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[5000, 10000, 15000, 20000, 250000, 30000].map((price, i) => (
          <option key={i} value={price}>
            {" "}
            {price}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PriceFilter;
