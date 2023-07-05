import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateProps } from "./types"

const initialState: InitialStateProps = {
    appName: "React App"
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeAppName: (state, action: PayloadAction<InitialStateProps['appName']>) => {
            state.appName = action.payload;
        }
    }
});

export const {
    changeAppName
} = appSlice.actions;

export default appSlice.reducer;