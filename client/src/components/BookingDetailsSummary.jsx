import React from "react";

function BookingDetailsSummary({
  checkIn,
  checkOut,
  childCount,
  adultCount,
  numberOfNights,
  hotelId,
}) {
  return (
    <div className="grid gap-6 rounded-md border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold capitalize">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotelId && hotelId?.name}, ${
          hotelId && hotelId?.city
        }, ${hotelId && hotelId?.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold">{checkIn?.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold">{checkOut?.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights}</div>
      </div>
      <div className="">
        Guests:
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsSummary;
