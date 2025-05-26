import React from "react";
import "./MuseumCard.css";
import mapIcon from "../assets/mapIcon.jpg"; // Placeholder image

const MuseumCard = ({
  nombre = "Museo Ejemplo",
  categoria = "Arte",
  fundacion = "1990",
  administracion = "Pública",
  municipio = "Guadalajara",
  localidad = "Centro",
  direccion = "Calle Falsa 123",
  telefono = "123-456-7890",
  correo = "info@museo.com"
}) => (
  <div className="museum-card">
    <img src={mapIcon} alt="Museo" className="museum-image" />
    <h2 className="museum-title">{nombre}</h2>
    <div className="museum-info">
      <span className="museum-label">Categoría: </span>
      <span className="museum-data">{categoria}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Fecha de fundación: </span>
      <span className="museum-data">{fundacion}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Administración: </span>
      <span className="museum-data">{administracion}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Municipio: </span>
      <span className="museum-data">{municipio}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Localidad: </span>
      <span className="museum-data">{localidad}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Dirección: </span>
      <span className="museum-data">{direccion}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Teléfono: </span>
      <span className="museum-data">{telefono}</span>
    </div>
    <div className="museum-info">
      <span className="museum-label">Correo electrónico: </span>
      <span className="museum-data">{correo}</span>
    </div>
    <button className="museum-more">Ver más información</button>
  </div>
);

export default MuseumCard; 