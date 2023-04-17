import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
  "createUser",
  async function (userData, { rejectWithValue }) {
    try {
      const response = await axios.post(
        "https://642ad284b11efeb759a3c928.mockapi.io/redux-crud",
        userData
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://642ad284b11efeb759a3c928.mockapi.io/redux-crud`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const UpdateUser = createAsyncThunk(
  "updateUser",
  async function ({ id, fname, lname, email, age, city }, { rejectWithValue }) {
    try {
      const response = await axios.put(
        `https://642ad284b11efeb759a3c928.mockapi.io/redux-crud/${id}`,
        {
          fname,
          lname,
          email,
          age,
          city,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.delete(
        `https://642ad284b11efeb759a3c928.mockapi.io/redux-crud/${id}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UserData = createSlice({
  name: "UserData",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },

    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [getUser.pending]: (state, action) => {
      state.loading = true;
    },

    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    },
    [UpdateUser.pending]: (state, action) => {
      state.loading = true;
    },

    [UpdateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((element) =>
        element.id === action.payload ? action.payload : element
      );
    },
    [UpdateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload.data;
      state.users = state.users.filter((item) => item.id !== id);
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default UserData.reducer;
