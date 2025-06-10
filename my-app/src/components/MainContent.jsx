import React, { useEffect, useState, useCallback } from "react";
import FilterBar from "./FilterBar";
import MuseumCard from "./MuseumCard";
import MapView from "./MapView";
import { supabase } from "../supabaseClient";
import "./MainContent.css";

function MainContent({ appliedFilters = {}, filters, setFilters, onApplyFilters }) {
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);
  const words = ["ciencia", "tecnología", "historia", "antropología", "arqueología", "arte", "agricultura"];
  const [index, setIndex] = useState(5); // Start with "arte" (index 5)
  const [word, setWord] = useState(words[5]);
  const [fadeClass, setFadeClass] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        const nextIndex = (index + 1) % words.length;
        setWord(words[nextIndex]);
        setIndex(nextIndex);
        setFadeClass("fade-in");
        setTimeout(() => setFadeClass(""), 500); // Remove fade-in after animation
      }, 500); // Fade out duration
    }, 2000);
    return () => clearInterval(interval);
  }, [index, words]);

  const scrollToMuseum = useCallback((museumId) => {
    const element = document.getElementById(`museum-${museumId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a highlight effect
      element.classList.add('highlight-museum');
      setTimeout(() => {
        element.classList.remove('highlight-museum');
      }, 2000);
    }
  }, []);

  const fetchMuseos = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('Museos').select('*');
    if (appliedFilters && appliedFilters.categoria && appliedFilters.categoria.length > 0) {
      query = query.in('categoria', appliedFilters.categoria);
    }
    if (appliedFilters && appliedFilters.municipio && appliedFilters.municipio.length > 0) {
      query = query.in('municipio', appliedFilters.municipio);
    }
    const { data, error } = await query;
    if (error) {
      console.error(error);
    } else {
      setMuseums(data);
    }
    setLoading(false);
  }, [appliedFilters]);

  useEffect(() => {
    fetchMuseos();
  }, [appliedFilters, fetchMuseos]);

  // Prepare markers for the map
  const markers = museums.map(museum => ({
    lat: museum.latitud,
    lng: museum.longitud,
    title: museum.nombre,
    description: museum.categoria,
    id: museum.idMuseo
  }));

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (!loading && museums.length === 0) {
    return <div className="no-results">Ningún resultado coincide con la búsqueda</div>;
  }

  return (
    <div className="main-content">
      <div className="map-intro-text">
         Hoy quiero descubrir <span className="word-slot">
            <span className={`pink-text ${fadeClass}`}>{word}</span>
         </span>
         <p style={{ fontFamily: 'Anaheim, sans-serif', fontSize: '1.2rem', marginTop: '1.5rem' }}>
         Explorar los museos de Jalisco no se trata de observar arte o artefactos antiguos. Se trata de darnos una oportunidad para reconectar con nuestras raíces, entender nuestro presente y el lugar que habitamos. Más allá de las exhibiciones, cada museo cuenta una historia, que en conjunto, le dan forma al estado en el que vivimos hoy en día. Conocer estas historias es conocernos a nosotros mismos.
         </p>
      </div>
      <MapView 
        markers={markers} 
        onMarkerClick={scrollToMuseum}
      />
      <FilterBar 
        filters={filters}
        setFilters={setFilters}
        onSearch={onApplyFilters}
      />
      <div className="museum-grid">
        {museums.map((museum) => (
          <MuseumCard
            key={museum.idMuseo}
            id={`museum-${museum.idMuseo}`}
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