import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import LoadingBar from "./components/LoadingBar";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    // Simulate loading for demo; replace with real loading logic
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  return (
    <div className="App">
      <LoadingBar loading={loading} />
      <Header />
      <MainContent 
        appliedFilters={appliedFilters} 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={handleApplyFilters} 
      />
      <Footer />
    </div>
  );
}

export default App; 