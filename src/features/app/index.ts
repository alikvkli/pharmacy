import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialStateProps, PharmacyListProps } from "./types"

const initialState: InitialStateProps = {
    appName: "Nöbetçi Eczane Uygulaması",
    provinces: undefined,
    districts: undefined,
    selectedProvince: undefined,
    selectedDistrict: undefined,
    pharmacy_list: [],
    filtered_pharmacies: []

}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        _setProvices: (state, action: PayloadAction<InitialStateProps['provinces']>) => {
            state.provinces = action.payload;
        },
        _setSelectedProvince: (state, action: PayloadAction<string>) => {
            const findProvince = state.provinces?.find(item => item.name === action.payload);
            if (findProvince) {
                state.selectedProvince = findProvince;
                state.districts = findProvince.districts;
                state.selectedDistrict = undefined;
            }
        },
        _setSelectedDistrict: (state, action: PayloadAction<string>) => {

            if (state.selectedProvince !== undefined) {
                const findDistrict = state.selectedProvince.districts.find(item => item.name === action.payload);
                state.selectedDistrict = findDistrict;
            }
        },
        _setPharmacyList: (state, action: PayloadAction<PharmacyListProps>) => {
            const tempData = state.pharmacy_list;
            if (tempData?.length > 0) {
                const checkDataExist = tempData.findIndex(item => item.identifier === action.payload.identifier);
                if (checkDataExist === -1) {
                    state.pharmacy_list = [...state.pharmacy_list, action.payload];
                }
            } else {
                state.pharmacy_list = [action.payload]
            }
            state.filtered_pharmacies = state.pharmacy_list.find(item => item.identifier === action.payload.identifier)?.data || [];
        },
        _filteredPharmacyList: (state, action: PayloadAction<number>) => {
            state.filtered_pharmacies = state.pharmacy_list.find(item => item.identifier === action.payload)?.data || [];

        },
        _clearPharmacyList: (state) => {
            state.filtered_pharmacies = [];
        }

    }
});

export const {
    _setProvices,
    _setSelectedProvince,
    _setSelectedDistrict,
    _setPharmacyList,
    _filteredPharmacyList,
    _clearPharmacyList
} = appSlice.actions;

export default appSlice.reducer;