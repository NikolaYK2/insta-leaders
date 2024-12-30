import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertState = {
  message: string;
  variant: "success" | "alertError";
};

const initialState: AlertState = {
  message: "",
  variant: "alertError",
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
    },
    hiddenAlert: (state) => {
      state.message = "";
    },
  },
});

export const { showAlert, hiddenAlert } = slice.actions;
export const appSlice = slice.reducer;
