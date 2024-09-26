import React, { useContext, useEffect, useState } from "react";

const SearchContext = React.createContext();

export const SearchContextProvider = ({ children }) => {
  const getInitialDate = (key, defaultValue) => {
    const dateStr = sessionStorage.getItem(key);
    const date = dateStr ? new Date(dateStr) : defaultValue;
    return isNaN(date?.getTime()) ? defaultValue : date;
  };
  const [destination, setDestination] = useState(
    () => sessionStorage.getItem("destination")?.toString() || ""
  );
  const [checkIn, setCheckIn] = useState(
    () => new Date(getInitialDate("checkIn") || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState(
    () => new Date(getInitialDate("checkOut") || new Date().toISOString())
  );
  const [adultCount, setAdultCount] = useState(() =>
    parseInt(sessionStorage.getItem("adultCount") || "1", 20)
  );
  const [childCount, setChildCount] = useState(() =>
    parseInt(sessionStorage.getItem("childCount" || "0", 20))
  );
  const [hotelId, setHotelId] = useState(
    () => sessionStorage.getItem("hotelId") || "{}"
  );

  useEffect(() => {
    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn?.toISOString());
    sessionStorage.setItem("checkOut", checkOut?.toISOString());
    sessionStorage.setItem("adultCount", adultCount?.toString());
    sessionStorage.setItem("childCount", childCount?.toString());
    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  }, [destination, checkIn, checkOut, adultCount, childCount, hotelId]);

  const saveSearchValues = (
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    // sessionStorage.setItem("destination", destination);
    // sessionStorage.setItem("checkIn", checkIn?.toISOString());
    // sessionStorage.setItem("checkOut", checkOut?.toISOString());
    // sessionStorage.setItem("adultCount", childCount?.toString());
    // sessionStorage.setItem("childCount", childCount?.toString());
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
