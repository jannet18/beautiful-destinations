import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

function FaciltyTypeFilter({ selectedFacility, onChange }) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facility Type</h4>
      {hotelFacilities.map((facility, i) => (
        <label key={i} className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacility?.includes(facility)}
            onChange={onChange}
          />
          <span className="">{facility}</span>
        </label>
      ))}
    </div>
  );
}
export default FaciltyTypeFilter;
