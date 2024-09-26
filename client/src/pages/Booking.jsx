import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { useAppContext } from "../contexts/AppContext";
import { Elements } from "@stripe/react-stripe-js";

function Booking() {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs((search?.checkOut).getTime() - search?.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math?.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData, error: paymentIntentError } = useQuery(
    "createPaymentIntent",
    () => apiClient.createPaymentIntent(hotelId, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );
  // console.log(paymentIntentData);

  const { data: hotel, error: hotelError } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser, error: currentUserError } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  // console.log(currentUser);
  // console.log(hotelId);
  if (!hotel) {
    return <></>;
  }

  if (hotelError || paymentIntentError || currentUserError) {
    console.error("Error fetching data:", {
      hotelError,
      paymentIntentError,
      currentUserError,
    });
    return <div>Error loading booking data. Please try again later.</div>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-6">
      <BookingDetailsSummary
        checkIn={search?.checkIn}
        checkOut={search?.checkOut}
        adultCount={search?.adultCount}
        childCount={search?.childCount}
        numberOfNights={numberOfNights}
        hotelId={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData?.client_secret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
}

export default Booking;
