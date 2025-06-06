import React, { useMemo } from "react";
import Select, { components } from "react-select";
import "./FilterBar.css";

const municipios = [
  "Lagos de Moreno", "Degollado", "Tecalitlán", "Jalostotitlán", "Ahualulco de Mercado", "Tequila",
  "Casimiro Castillo", "Huejuquilla el Alto", "La Barca", "San Pedro Tlaquepaque", "Atenguillo", "Chapala",
  "Cuautitlán de García Barragán", "Villa Corona", "Sayula", "Cocula", "San Julián", "Tonalá",
  "Teocuitatlán de Corona", "Jesús María", "Tlajomulco de Zúñiga", "Pihuamo", "Juanacatlán", "Zapopan",
  "Tala", "Mezquitic", "Totatiche", "Zapotlán el Grande", "Valle de Guadalupe", "San Sebastián del Oeste",
  "San Juan de los Lagos", "El Arenal", "Teuchitlán", "El Limón", "Ejutla", "Puerto Vallarta",
  "Zapotiltic", "San Martín Hidalgo", "Poncitlán", "Etzatlán", "Tepatitlán de Morelos", "Talpa de Allende",
  "Magdalena", "Guadalajara", "Guachinango", "Ocotlán", "Ameca", "Amatitán", "Mascota", "Amacueca",
  "Tamazula de Gordiano", "Zapotitlán de Vadillo", "Autlán de Navarro", "Encarnación de Díaz"
];

const categorias = [
  "Especializado", "Ciencia y tecnología", "Historia", "Antropología",
  "Arqueología", "Arte", "Agricultura"
];

const FilterBar = ({ filters, setFilters, onSearch }) => {

  // Handle single select for categoria and add to filters array
  const handleCategoriaChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && !(filters.categoria || []).includes(selectedValue)) {
      setFilters(prev => ({ ...prev, categoria: [...(prev.categoria || []), selectedValue] }));
    }
  };

  // Handle single select for municipio and add to filters array
  const handleMunicipioChange = (e) => {
    const selectedValue = e.target.value;
     if (selectedValue && !(filters.municipio || []).includes(selectedValue)) {
      setFilters(prev => ({ ...prev, municipio: [...(prev.municipio || []), selectedValue] }));
    }
  };

  // Remove a selected option (chip)
  const removeFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(v => v !== value)
    }));
  };

  const handleClearFilters = () => {
    setFilters({ categoria: [], municipio: [] });
  };

  const handleShowAll = () => {
    setFilters({ categoria: [], municipio: [] });
    onSearch(); // Trigger search with empty filters
  };

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <label className="filter-label" htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          className="filter-select"
          value="" // Value is always empty as we add to chips
          onChange={handleCategoriaChange}
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="filter-chips">
          {(filters.categoria || []).map(cat => (
            <span className="filter-chip" key={cat}>
              {cat}
              <button onClick={() => removeFilter('categoria', cat)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <label className="filter-label" htmlFor="municipio">Municipio:</label>
        <select
          id="municipio"
          className="filter-select"
          value="" // Value is always empty as we add to chips
          onChange={handleMunicipioChange}
        >
          <option value="" disabled>Selecciona un municipio</option>
          {municipios.map(mun => (
            <option key={mun} value={mun}>{mun}</option>
          ))}
        </select>
        <div className="filter-chips">
          {(filters.municipio || []).map(mun => (
            <span className="filter-chip" key={mun}>
              {mun}
              <button onClick={() => removeFilter('municipio', mun)}>×</button>
            </span>
          ))}
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-clear-btn" onClick={handleClearFilters}>
          Borrar filtros
        </button>
        <button className="filter-show-all-btn" onClick={handleShowAll}>
          Ver todos
        </button>
        <button className="filter-search-btn" onClick={onSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FilterBar; 