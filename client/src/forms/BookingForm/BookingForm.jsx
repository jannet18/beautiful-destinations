import React from "react";
import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";

function BookingForm({ currentUser, paymentIntent }) {
  const elements = useElements();
  const stripe = useStripe();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        // console.log("Booking saved successfully", data);
        showToast({ message: "Booking saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );
  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
      checkIn: search?.checkIn.toISOString(),
      checkOut: search?.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );
    if (result.paymentIntent?.status === "succeeded") {
      // book room
      console.log("Booking Data: ", {
        ...formData,
        paymentIntentId: result?.paymentIntent?.id,
      });

      bookRoom({ ...formData, paymentIntentId: result?.paymentIntent?.id });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-sm border border-slate-300 p-2"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          First Name
          <input
            type="text"
            className="mt-1  border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          Last Name
          <input
            type="text"
            className="mt-1  border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1 ">
          Email
          <input
            type="text"
            className="mt-1  border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold capitalize">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: Ksh {(paymentIntent?.totalCost * 10)?.toFixed(2)}
          </div>
        </div>
        <div className="text-sm">Include taxes and charges</div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm min-h-10"
        />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}

export default BookingForm;
