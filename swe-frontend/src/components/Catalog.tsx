import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Catalog.css";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: string;
  manufacturer: string;
  country: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

const Catalog = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products', {
          params: {
            sortOrder,
            selectedBrand,
            selectedCountry,
          },
        });
        setProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:8080/filters');
        setBrands(response.data.brands);
        setCountries(response.data.countries);
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };

    fetchProducts();  
    fetchFilters(); 
  }, [sortOrder, selectedBrand, selectedCountry]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

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
        {products.map(item => (
          <Link to={`/product/${item.id}`} key={item.id} className="catalog-card">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <p>{item.manufacturer} - {item.country}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
