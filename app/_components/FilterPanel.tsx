"use client";

import React, { useState } from "react";
import { FilterCategory, Filters } from "@/types/filters";
import RangeSlider from "./RangeSlider";

const popularOptions = [
  "Budget hotel",
  "Breakfast included",
  "Free airport shuttle",
  "Hostel/Backpacker",
];

const priceOptions = [
  "Less than $50",
  "$50 to $100",
  "$100 to $150",
  "$150 and more",
];

const ratingOptions = ["Any", "Excellent", "Very good", "Good"];

const FilterPanel: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    popular: [],
    price: [],
    rating: [],
  });

  const handleCheckboxChange = (
    category: FilterCategory,
    value: string,
  ): void => {
    setFilters((prev) => {
      const isChecked = prev[category].includes(value);
      const updatedCategory = isChecked
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <div className="my-4 space-y-6 px-8">
      <div>
        <h3 className="mt-2 text-2xl font-semibold">Popular filters</h3>
        {popularOptions.map((label) => (
          <label key={label} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={filters.popular.includes(label)}
              onChange={() => handleCheckboxChange("popular", label)}
              className="mr-2 cursor-pointer"
            />
            {label}
          </label>
        ))}
      </div>

      <div>
        <h3 className="mt-2 text-2xl font-semibold">Price per night</h3>
        {priceOptions.map((label) => (
          <label key={label} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={filters.price.includes(label)}
              onChange={() => handleCheckboxChange("price", label)}
              className="mr-2 cursor-pointer"
            />
            {label}
          </label>
        ))}
      </div>
      <RangeSlider />
      <div>
        <h3 className="mt-2 text-2xl font-semibold">Guest rating</h3>
        {ratingOptions.map((label) => (
          <label key={label} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={filters.rating.includes(label)}
              onChange={() => handleCheckboxChange("rating", label)}
              className="mr-2 cursor-pointer"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
