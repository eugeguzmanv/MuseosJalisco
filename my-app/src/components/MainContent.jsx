import React, { useEffect, useState, useCallback } from "react";
import FilterBar from "./FilterBar";
import MuseumCard from "./MuseumCard";
import MapView from "./MapView";
import { supabase } from "../supabaseClient";
import "./MainContent.css";

function MainContent({ filters = {}, setFilters }) {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMuseos = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('Museos').select('*');
    if (filters && filters.categoria && filters.categoria.length > 0) {
      query = query.in('categoria', filters.categoria);
    }
    if (filters && filters.municipio && filters.municipio.length > 0) {
      query = query.in('municipio', filters.municipio);
    }
    const { data, error } = await query;
    if (error) {
      console.error(error);
    } else {
      setMuseums(data);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchMuseos();
  }, [filters]); // Re-run fetch when filters change

  // Prepare markers for the map
  const markers = museums.map(museum => ({
    lat: museum.latitud,
    lng: museum.longitud,
    title: museum.nombre,
    description: museum.categoria,
    id: museum.idMuseo
  }));

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>; // Display loading spinner
  }

  // Display message if no museums are found after loading
  if (!loading && museums.length === 0) {
    return <div className="no-results">Ningún resultado coincide con la búsqueda</div>;
  }

  return (
    <div className="main-content">
      <MapView markers={markers} />
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onSearch={fetchMuseos}
      />
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