import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

function Details() {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId),
    {
      enabled: !!hotelId,
    }
  );

  // console.log(hotel);
  if (!hotel) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-row">
        {Array.from({ length: hotel?.starRating }).map((_, index) => (
          <span key={index}>
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
        <h1 className="text-3xl font-bold ml-12 ">{hotel?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel?.imageUrls?.map((image, i) => (
          <div key={i} className="h-[300px]">
            <img
              key={i}
              src={image}
              alt={hotel.name}
              className="rounded-md w-full object-cover object-center h-full"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel?.facilities?.map((facility, i) => (
          <div key={i} className="flex flex-row gap-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel?.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel?.pricePerNight}
            hotelId={hotel?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
