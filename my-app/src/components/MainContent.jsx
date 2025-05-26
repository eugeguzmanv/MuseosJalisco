import React, { useEffect } from "react";
import FilterBar from "./FilterBar";
import MuseumCard from "./MuseumCard";
import MapView from "./MapView";
import { supabase } from "../supabaseClient";
import "./MainContent.css";

const museums = [
  { id: 1, name: "Museo 1" },
  { id: 2, name: "Museo 2" },
  { id: 3, name: "Museo 3" },
  { id: 4, name: "Museo 4" },
];

function MainContent({ filters, setFilters }) {
  useEffect(() => {
    async function fetchMuseums() {
      const { data, error } = await supabase
        .from('Museos') // replace with your table name
        .select('*');
      if (error) {
        console.error(error);
      } else {
        console.log("Museums from Supabase:", data);
      }
    }
    fetchMuseums();
  }, []);

  const markers = [
    { lat: 20.6597, lng: -103.3496, title: "Guadalajara", description: "Centro" }
  ];

  return (
    <div className="main-content">
      <MapView markers={markers} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="museum-grid">
        {museums.map((museum) => (
          <MuseumCard key={museum.id} name={museum.name} />
        ))}
      </div>
    </div>
  );
}

export default MainContent; 