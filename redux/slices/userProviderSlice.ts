import { createSlice } from "@reduxjs/toolkit";
import { IuserProviderState } from "@/types/supabaseTypes";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IuserProviderState = {
  google: false,
  facebook: false,
  discord: false,
};

const userProviderSlice = createSlice({
  name: "userProvider",
  initialState,
  reducers: {
    setGoogle(state, action: PayloadAction<boolean>) {
      state.google = action.payload;
    },
    setFacebook(state, action: PayloadAction<boolean>) {
      state.facebook = action.payload;
    },
    setDiscord(state, action: PayloadAction<boolean>) {
      state.discord = action.payload;
    },
    resetProviders(state) {
      state.google = false;
      state.facebook = false;
      state.discord = false;
    },
  },
});

export const { setGoogle, setFacebook, setDiscord, resetProviders } =
  userProviderSlice.actions;
export default userProviderSlice.reducer;
