"use client";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { FilterCategory } from "@/types/filters";
import { toggleFilter } from "@/redux/slices/filterSlice";
import RangeSlider from "./RangeSlider";
import { setPriceRange } from "@/redux/slices/rangeSliec";

const amenities = [
  "Wi-Fi",
  "Air conditioning",
  "TV",
  "Washer",
  "Dryer",
  "Kitchen",
  "Free parking",
  "Gym",
  "Pool",
  "Pet-friendly",
  "Breakfast included",
  "Workspace",
  "Elevator",
  "Heating",
];

const priceOptions = [
  "Less than $50",
  "$50 to $100",
  "$100 to $150",
  "$150 and more",
];

const ratingOptions = ["Any", "Excellent", "Very good", "Good", "Fair", "Poor"];

const types = ["Hotel", "Motel", "Cabin"];

const FilterPanel: FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { priceRange } = useAppSelector((state) => state.range);
  const handleCheckboxChange = (
    category: FilterCategory,
    value: string,
  ): void => {
    dispatch(toggleFilter({ category, value }));
  };

  return (
    <div className="my-4 space-y-6 px-8">
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

      <RangeSlider
        min={priceRange.min}
        max={priceRange.max}
        setMin={(min) => dispatch(setPriceRange({ min, max: priceRange.max }))}
        setMax={(max) => dispatch(setPriceRange({ min: priceRange.min, max }))}
      />
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

      <div>
        <h3 className="mt-2 text-2xl font-semibold">Type of accommodation</h3>
        {types.map((label) => (
          <label key={label} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={filters.types.includes(label)}
              onChange={() => handleCheckboxChange("types", label)}
              className="mr-2 cursor-pointer"
            />
            {label}
          </label>
        ))}
      </div>
      <div>
        <h3 className="mt-2 text-2xl font-semibold">Amenities</h3>
        {amenities.map((label) => (
          <label key={label} className="flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={filters.amenities.includes(label)}
              onChange={() => handleCheckboxChange("amenities", label)}
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
