import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  booking: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createBooking = createAsyncThunk(
  "booking/create",
  async (bookingData, thunkApi) => {
    try {
      const { roomId, ...rest } = bookingData;
      const res = await fetch(`http://localhost:3000/api/booking`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getBooking = createAsyncThunk(
  "booking/getbooking",
  async (_, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:3000/api/booking`, {
        method: "GET",
      });
      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "/booking/delete",
  async (id, thunkApi) => {
    try {
      const res = await fetch(`http://localhost:3000/api/booking/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateBooking = createAsyncThunk(
  "/booking/update",
  async (bookingData, thunkApi) => {
    try {
      const { id, ...rest } = bookingData;
      const res = await fetch(`http://localhost:3000/api/booking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(rest),
      });
      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = actions.payload;
      })
      .addCase(createBooking.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooking.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.bookings = actions.payload;
      })
      .addCase(getBooking.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.filter(
          (booking) => booking._id.toString() !== actions.payload.id
        );
      })
      .addCase(deleteBooking.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateBooking.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.booking = actions.payload;
      })
      .addCase(updateBooking.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = actions.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;

export default bookingSlice.reducer;
