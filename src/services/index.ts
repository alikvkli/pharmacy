import axios from "axios";
import { DistrictListResponse, DutyPharmacyResponse, ProvinceListResponse } from "./types";

const instance = axios.create({
    baseURL: "https://api.collectapi.com/health",
    headers: {
        Authorization: `apikey ${process.env.REACT_APP_API_KEY}`
    }
});



export const getDistrictList = async (province: string): Promise<DistrictListResponse> => {
    let params = new URLSearchParams();
    params.append("il", province);

    const { data } = await instance.get("/districtList", {
        params: params
    });

    return data;

}

export const getDutyPharmacy = async (province: string, district: string): Promise<DutyPharmacyResponse> => {
    let params = new URLSearchParams();
    params.append("ilce", district);
    params.append("il", province);

    const { data } = await instance.get("/dutyPharmacy", {
        params: params
    });

    return data;
}

export const getProvinceList = async (): Promise<ProvinceListResponse> => {
    const { data } = await axios.get("https://turkiyeapi.cyclic.app/api/v1/provinces");
    return data;
}