import React from 'react';

const CategoryCard = ({ image }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full h-auto" src={image} alt="Category" />
    </div>
  );
};

export default CategoryCard;
