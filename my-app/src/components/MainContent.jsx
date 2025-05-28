import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import MuseumCard from "./MuseumCard";
import MapView from "./MapView";
import { supabase } from "../supabaseClient";
import "./MainContent.css";

function MainContent({ filters, setFilters }) {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMuseos() {
      setLoading(true);
      const { data, error } = await supabase
        .from('Museos')
        .select('*');
      if (error) {
        console.error(error);
      } else {
        setMuseums(data);
      }
      setLoading(false);
    }
    fetchMuseos();
  }, []);

  // Prepare markers for the map
  const markers = museums.map(museum => ({
    lat: museum.latitud,
    lng: museum.longitud,
    title: museum.nombre,
    description: museum.categoria,
    id: museum.idMuseo
  }));

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-spinner">Cargando museos...</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <MapView markers={markers} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <div className="museum-grid">
        {museums.map((museum) => (
          <MuseumCard
            key={museum.idMuseo}
            nombre={museum.nombre}
            categoria={museum.categoria}
            fundacion={museum.fecha_fundacion}
            administracion={museum.administracion}
            municipio={museum.municipio}
            localidad={museum.localidad}
            direccion={`${museum.calle_numero}, ${museum.colonia}, ${museum.cp}`}
            telefono={museum.telefono}
            correo={museum.email}
            imagen={museum.direccion_imagen}
            linkSic={museum.link_sic}
          />
        ))}
      </div>
    </div>
  );
}

export default MainContent; 