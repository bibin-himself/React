
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({

    name: "users",
    initialState: {
        users: [],
        loading:false,
        error: null
    },

    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        deleteUser: (state, action) => {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id !== id);
        },
    },

});


export const {setUsers, setLoading, setError, deleteUser} = usersSlice.actions;
export default usersSlice.reducer;