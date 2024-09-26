import React from "react";
import { Link } from "react-router-dom";

const SearchResultsCard = ({ hotel }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-6">
      <div className="w-full h-[300px]">
        <img
          src={hotel?.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div className="">
          <div className="flex items-center">
            {Array.from({ length: hotel?.starRating }).map((_, index) => (
              <span key={index} className="flex flex-row  gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="size-6 fill-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </span>
            ))}

            <span className="ml-3 text-sm font-medium">{hotel.type}</span>
          </div>
          <Link
            to={`/details/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel?.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel?.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, i) => (
              <span
                key={i}
                className="bg-slate-300 p-2 rounded-sm font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          <div className="flex flex-col items-end gap-3">
            <span className="font-bold">
              Ksh {hotel?.pricePerNight} per Night
            </span>
            <Link
              to={`/details/${hotel._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500 rounded-sm"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
