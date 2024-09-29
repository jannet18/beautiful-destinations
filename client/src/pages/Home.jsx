import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
function Home() {
  const { data: hotels } = useQuery("fetchHotels", () =>
    apiClient?.fetchHotels()
  );
  // console.log(hotels);
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-6 p-10">
      <h2 className="text-4xl font-bold text-gray-800">Latest Destinations</h2>
      <p className="text-lg text-gray-600">
        Most recent destinations added by our hosts
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...topRowHotels, ...bottomRowHotels].map((hotel, index) => (
          <LatestDestinationCard
            key={index}
            hotel={hotel}
            className="transform transition hover:scale-105 hover:shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
