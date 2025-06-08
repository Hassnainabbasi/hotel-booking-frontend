import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  isLoading: false,
  isSucess: false,
  isError: false,
  message: "",
};

export const createRoom = createAsyncThunk(
  "room/create",
  async (roomData, thunkApi) => {
    try {
      const res = await fetch("http://localhost:3000/api/rooms", {
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

export const getRooms = createAsyncThunk("room/getall", async(_, thunkApi) =>{
    try{
        const res = await fetch("http://localhost:3000/api/rooms",{
            method : "GET"
        })
        if (!res.ok) {
            const err = await res.json()
            thunkApi.rejectWithValue(err)
        }
       let data = await res.json()
       return data
    }
    catch(e){
        thunkApi.rejectWithValue(e)
    }
})


export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSucess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSucess = true;
        state.rooms = actions.payload;
      })
      .addCase(createRoom.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSucess = true;
        state.rooms = actions.payload;
      })
      .addCase(getRooms.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});
export const { reset } = roomSlice.actions;
export default roomSlice.reducer;
