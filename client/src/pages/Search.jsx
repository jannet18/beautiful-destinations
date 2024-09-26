import React, { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilityTypeFilter from "../components/FacilityTypeFilter";
import PriceFilter from "../components/PriceFilter";

function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState([]);
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    // Update search context with current page
    search?.saveSearchValues({ ...search, page });
  }, [page]);

  const searchParams = {
    destination: search?.destination,
    checkIn: search?.checkIn,
    checkOut: search?.checkOut,
    adultCount: search?.adultCount,
    childCount: search?.childCount,
    page: page?.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    Facilities: selectedFacilityTypes,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data } = useQuery(["searchHotels", searchParams], () =>
    apiClient?.searchHotels(searchParams)
  );
  // console.log(data);

  const handleStarsChange = (event) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) => {
      const updatedStars = Array.isArray(prevStars) ? prevStars : [];
      return event.target.checked
        ? [...updatedStars, starRating]
        : prevStars?.filter((star) => star !== starRating);
    });
  };

  const handleHotelTypeChange = (event) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevTypes) => {
      const updatedTypes = Array.isArray(prevTypes) ? prevTypes : [];
      return event.target.checked
        ? [...updatedTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType);
    });
  };

  const handleFacilityTypeChange = (event) => {
    const facilityType = event.target.value;
    setSelectedFacilityTypes((prevTypes) => {
      const updatedTypes = Array.isArray(prevTypes) ? prevTypes : [];
      return event.target.checked
        ? [...updatedTypes, facilityType]
        : prevTypes.filter((type) => type !== facilityType);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
      {/* Sidebar Filters */}
      <aside className="rounded-lg border border-slate-300 p-5 h-fit z-1">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>

          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />

          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />

          <FacilityTypeFilter
            selectedFacilityTypes={selectedFacilityTypes}
            onChange={handleFacilityTypeChange}
          />

          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex flex-col gap-5">
        {/* Results Header */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold capitalize">
            {data?.pagination?.total || 0} Hotels found
            {search?.destination ? ` in ${search?.destination}` : ""}
          </span>

          <select
            className="p-2 border rounded-md"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price (low to high)</option>
            <option value="pricePerNightDesc">Price (high to low)</option>
          </select>
        </div>

        {/* Hotel Results */}
        <div className="grid gap-4">
          {data &&
            data.data?.map((hotel, id) => (
              <SearchResultsCard key={id} id={data._id} hotel={hotel} />
            ))}
          {/* {data?.data?.map((hotel, id) => (
            <SearchResultsCard key={id} id={hotel._id} hotel={hotel} />
          ))} */}
        </div>

        {/* Pagination */}
        <div className="mt-5">
          <Pagination
            page={data?.pagination?.page || 1}
            pages={data?.pagination?.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </section>
    </div>
  );
}

export default Search;
