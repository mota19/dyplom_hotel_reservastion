import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "@/types/filters";

const initialState: Filters = {
  price: [],
  rating: [],
  types: [],
  country: [],
  amenities: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateCountry: (state, action: PayloadAction<{ country: string[] }>) => {
      state.country = action.payload.country;
    },
    updateTypes: (state, action: PayloadAction<{ types: string[] }>) => {
      state.types = action.payload.types;
    },
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.amenities = action.payload.amenities;
      state.price = action.payload.price;
      state.rating = action.payload.rating;
      state.types = action.payload.types;
    },
    toggleFilter: (
      state,
      action: PayloadAction<{ category: keyof Filters; value: string }>,
    ) => {
      const { category, value } = action.payload;
      const isChecked = state[category].includes(value);
      if (isChecked) {
        state[category] = state[category].filter((item) => item !== value);
      } else {
        state[category] = [...state[category], value];
      }
    },
  },
});

export const { updateFilters, toggleFilter, updateTypes, updateCountry } =
  filtersSlice.actions;
export default filtersSlice.reducer;
