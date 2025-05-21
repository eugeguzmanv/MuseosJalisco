import React from "react";
import FilterBar from "./FilterBar";
import MuseumCard from "./MuseumCard";
import "./MainContent.css";

const museums = [
  { id: 1, name: "Museo 1" },
  { id: 2, name: "Museo 1" },
];

const MainContent = () => (
  <div className="main-content">
    <div className="map-placeholder">[Mapa aquí]</div>
    <div className="right-panel">
      <FilterBar />
      {museums.map((museum) => (
        <MuseumCard key={museum.id} name={museum.name} />
      ))}
    </div>
  </div>
);

export default MainContent; 