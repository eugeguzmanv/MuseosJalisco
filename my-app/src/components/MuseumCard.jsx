import React from "react";
import "./MuseumCard.css";

const MuseumCard = ({
  nombre,
  categoria,
  fundacion,
  administracion,
  municipio,
  localidad,
  direccion,
  telefono,
  correo,
  imagen,
  linkSic
}) => (
  <div className="museum-card">
    <img src={imagen} alt={nombre} className="museum-image" />
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
    <a
      className="museum-more"
      href={linkSic}
      target="_blank"
      rel="noopener noreferrer"
    >
      Ver más información
    </a>
  </div>
);

export default MuseumCard; 