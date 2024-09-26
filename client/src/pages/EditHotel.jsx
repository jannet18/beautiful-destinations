import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import App from "../App";
import { useAppContext } from "../contexts/AppContext";
// import app-context from "../contexts/app-context";

// function EditHotel() {
//   const { hotelId } = useParams();
//   const { showToast } = useContext(app-context);
//   const navigate = useNavigate();
//   const { data } = useQuery(
//     ["fetchMyHotelById", hotelId],
//     () => apiClient.fetchMyHotelById(hotelId || ""),
//     {
//       enabled: !!hotelId,
//       onError: () => {
//         showToast({ message: "Error fetching hotel", type: "ERROR" });
//       },
//     }
//   );
//   const { mutate } = useMutation(
//     (formData) => {
//       apiClient.updateMyHotelById(hotelId, formData);
//     },
//     {
//       onSuccess: () => {
//         showToast({ message: "Hotel updated!", type: "SUCCESS" });
//         navigate("/my-hotels");
//       },
//       onError: () => {
//         showToast({ message: "Error updating hotel", type: "ERROR" });
//       },
//     }
//   );

//   const handleSave = (formData) => {
//     console.log(formData);
//     mutate(formData);
//   };
//   return <ManageHotelForm hotel={data} onSave={handleSave} />;
// }
// export default EditHotel;

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext;
  const navigate = useNavigate();
  const { data } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Updated!", type: "SUCCESS" });
      navigate("/my-hotels");
    },
    onError: () => {
      showToast({ message: "Error Updating Hotel", type: "ERROR" });
    },
  });

  const handleSave = (formData) => {
    mutate(formData);
  };

  return (
    <ManageHotelForm hotel={data} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
