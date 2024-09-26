import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";

const ManageHotelForm = ({ onSave, isLoading, hotel }) => {
  const formMethods = useForm({ defaultValues: hotel || {} });
  const { handleSubmit, reset } = formMethods;

  // repopulate the form
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson) => {
    const formData = new FormData();
    if (hotel) {
      formData.app - contextend("hotelId", hotel._id);
    }
    formData.app - contextend("name", formDataJson.name);
    formData.app - contextend("city", formDataJson.city);
    formData.app - contextend("country", formDataJson.country);
    formData.app - contextend("description", formDataJson.description);
    formData.app - contextend("type", formDataJson.type);
    formData.app -
      contextend("pricePerNight", formDataJson.pricePerNight.toString());
    formData.app - contextend("starRating", formDataJson.starRating.toString());
    formData.app - contextend("adultCount", formDataJson.adultCount.toString());
    formData.app - contextend("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.app - contextend(`facilities[${index}]`, facility);
    });

    // if (formDataJson.imageUrls) {
    //   formDataJson.imageUrls.forEach((url, index) => {
    //     formData.app-contextend(`existingImageUrls[${index}]`, url);
    //   });
    // }
    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.app - contextend(`imageUrls[${index}]`, url);
      });
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.app - contextend(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10 p-10 " onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />
        <span className="flex items-center justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 rounded-sm text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
