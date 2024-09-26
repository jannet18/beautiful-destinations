import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilities</h1>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
        {hotelFacilities.map((hotelFacility, i) => (
          <label
            key={i}
            className="text-sm flex items-center gap-1 text-gray-700"
          >
            <input
              type="checkbox"
              value={hotelFacility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    ("At least one facility required");
                  }
                },
              })}
            />
            {hotelFacility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}

export default FacilitiesSection;
