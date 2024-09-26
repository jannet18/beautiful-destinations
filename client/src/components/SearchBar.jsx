import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(search?.destination || "");
  const [checkIn, setCheckIn] = useState(
    search?.checkIn ? new Date(search.checkIn) : null
  );
  const [checkOut, setCheckOut] = useState(
    search?.checkOut ? new Date(search.checkOut) : null
  );
  const [adultCount, setAdultCount] = useState(search?.adultCount || 1);
  const [childCount, setChildCount] = useState(search?.childCount || 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    search?.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date().toISOString();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ff5a3b] rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4 mx-3"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 -ml-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          // type="text"
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination || ""}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold "
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => {
              setAdultCount(parseInt(event.target.value));
            }}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold "
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => {
              setChildCount(parseInt(event.target.value));
            }}
          />
        </label>
      </div>
      <div>
        <DatePicker
          // dateFormat="MM-DD-YYYY"
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-In Date"
          className="min-w-full bg-white p-2 ml-2 focus:outline-none"
          wrapp-contexterClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          // dateFormat="MM-DD-YYYY"
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="min-w-full bg-white p-2.5 ml-2 focus:outline-none"
          wrapp-contexterClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button
          onClick={() => {
            setDestination("");
            setCheckIn(null);
            setCheckOut(null);
            setAdultCount(1);
            setChildCount(0);
          }}
          className="w-1/3 bg-white text-[#333] h-full p-2 font-bold text-xl hover:bg-[#8febeb]"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
