import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../../../constant";

const initialState = {
  rooms: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createRoom = createAsyncThunk(
  "room/create",
  async (roomData, thunkApi) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(roomData),
      });

      if (!res.ok) {
        const error = await res.json();
        return thunkApi.rejectWithValue(error);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getRooms = createAsyncThunk("room/getall", async (_, thunkApi) => {
  try {
    const res = await fetch(`${BASE_URL}/api/rooms`, {
      method: "GET",
    });
    if (!res.ok) {
      const err = await res.json();
      thunkApi.rejectWithValue(err);
    }
    let data = await res.json();
    return data;
  } catch (e) {
    thunkApi.rejectWithValue(e);
  }
});

export const updateRoom = createAsyncThunk(
  "/room/update",
  async (roomData, thunkApi) => {
    try {
      const { roomId, ...rest } = roomData;
      const res = await fetch(`${BASE_URL}/api/rooms/${roomId}`, {
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

export const deleteRoom = createAsyncThunk(
  "/room/delete",
  async (roomId, thunkApi) => {
    try {
      const res = await fetch(`${BASE_URL}/api/rooms/${roomId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }
      return roomId
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createRoom.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = actions.payload;
      })
      .addCase(createRoom.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.isSuccess = false;
      })
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getRooms.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.rooms = actions.payload;
      })
      .addCase(getRooms.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = actions.payload;
      })
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateRoom.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = actions.payload;
      })
      .addCase(updateRoom.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = actions.payload;
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteRoom.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rooms = state.rooms.filter(
          (room) => room._id !== actions.payload.id
        );
      })
      .addCase(deleteRoom.rejected, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});
export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
