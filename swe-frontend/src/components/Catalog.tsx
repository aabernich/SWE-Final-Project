import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Catalog.css";
import sampleClothes from "../data/mockClothes";

const Catalog = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const filteredAndSorted = sampleClothes
    .filter(item => {
      return (
        (selectedBrand === "all" || item.manufacturer === selectedBrand) &&
        (selectedCountry === "all" || item.country === selectedCountry)
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  const brands = Array.from(new Set(sampleClothes.map(item => item.manufacturer)));
  const countries = Array.from(new Set(sampleClothes.map(item => item.country)));

  return (
    <div className="catalog-container">
      <h1>Clothing Catalog</h1>

      <div className="filters">
        <label>
          Sort by price:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>

        <label>
          Filter by brand:
          <select value={selectedBrand} onChange={handleBrandChange}>
            <option value="all">All</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </label>

        <label>
          Filter by country:
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="all">All</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-grid">
        {filteredAndSorted.map(item => (
          <Link to={`/product/${item.id}`} key={item.id} className="catalog-card">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price.toFixed(2)}</p>
            <p>{item.manufacturer} - {item.country}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
