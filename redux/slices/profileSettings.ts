import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  save: boolean;
  edit: boolean;
}

const initialState: IinitialState = {
  save: false,
  edit: false,
};

const profileSettings = createSlice({
  name: "profileSetting",
  initialState,
  reducers: {
    isSave(state, action: PayloadAction<boolean>) {
      state.save = action.payload;
    },
    isEdit(state, action: PayloadAction<boolean>) {
      state.edit = action.payload;
    },
  },
});

export default profileSettings.reducer;

export const { isSave, isEdit } = profileSettings.actions;
