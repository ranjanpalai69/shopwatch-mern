import React, { useState } from 'react';

const Filters = () => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <div>
      <h2>Filters</h2>
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Anyone">Anyone</option>
      </select>
      <label htmlFor="brand">Filter by Brand:</label>
      <select id="brand" value={brand} onChange={handleBrandChange}>
        <option value="">All Brands</option>
        <option value="Timex">Timex</option>
        <option value="Fossil">Fossil</option>
        <option value="Fastrack">Fastrack</option>
        <option value="Casio">Casio</option>
      </select>
      <label htmlFor="rating">Filter by Rating:</label>
      <select id="rating" value={rating} onChange={handleRatingChange}>
        <option value="">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
    </div>
  );
};

export default Filters;
