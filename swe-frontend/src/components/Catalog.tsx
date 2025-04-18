import React from "react";
import "./Catalog.css"; // optional: create this file for styling

const sampleClothes = [
  {
    id: 1,
    name: "Denim Jacket",
    price: 49.99,
    manufacturer: "Levi's",
    country: "USA",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Graphic Tee",
    price: 19.99,
    manufacturer: "Uniqlo",
    country: "Japan",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Hoodie",
    price: 39.99,
    manufacturer: "Nike",
    country: "Vietnam",
    image: "https://via.placeholder.com/150"
  }
];

const Catalog = () => {
  return (
    <div className="catalog-container">
      <h1>Clothing Catalog</h1>
      <div className="catalog-grid">
        {sampleClothes.map(item => (
          <div className="catalog-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price.toFixed(2)}</p>
            <p>{item.manufacturer} - {item.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
