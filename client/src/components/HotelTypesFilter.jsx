import React from "react";
import { hotelTypes } from "../config/hotel-options-config";

function HotelTypesFilter({ selectedHotelTypes, onChange }) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-medium mb-2">Hotel Type</h4>
      {hotelTypes &&
        hotelTypes.map((hotel_Type, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={hotel_Type}
              onChange={onChange}
              checked={selectedHotelTypes?.includes(hotel_Type)}
            />
            <span>{hotel_Type}</span>
          </label>
        ))}
    </div>
  );
}

export default HotelTypesFilter;
