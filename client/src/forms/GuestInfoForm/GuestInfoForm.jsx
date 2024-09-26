import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

function GuestInfoForm({ hotelId, pricePerNight }) {
  const search = useSearchContext();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: errors,
  } = useForm({
    defaultValues: {
      checkIn: search?.checkIn,
      checkOut: search?.checkOut,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignIClick = (data) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/login", { state: { from: location } });
  };

  const onSubmit = (data) => {
    search?.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };
  return (
    <div className="bg-blue-200 flex flex-col p-4 gap-4">
      <h3 className="text-md font-bold">Ksh {pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignIClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapp-contexterClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date)}
              selectsEnd
              startDate={checkOut}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-Out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapp-contexterClassName="min-w-full"
            />
            <div className="flex justify-between bg-white px-2 py-1 gap-2 my-4">
              <label className="items-center flex">
                Adults:
                <input
                  type="number"
                  className="w-full p-1 focus:outline-none font-bold "
                  min={1}
                  max={20}
                  defaultValue={1}
                  {...register("adultCount", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "There must be at least one adult",
                    },
                  })}
                />
              </label>
              <label className="items-center flex">
                Children:
                <input
                  type="number"
                  className="w-full p-1 focus:outline-none font-bold "
                  min={0}
                  defaultValue={0}
                  max={20}
                  {...register("childCount", {
                    valueAsNumber: true,
                  })}
                />
              </label>
              {errors.adultCount && (
                <span className="text-red-500 text-sm font-semibold">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
          </div>
          {isLoggedIn && isLoggedIn ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GuestInfoForm;
