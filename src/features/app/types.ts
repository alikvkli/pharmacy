import { DutyPharmacyResult, ProvinceListData, ProvinceListDataDistricts } from "../../services/types";

export interface InitialStateProps {
    appName: string,
    provinces: ProvinceListData[] | undefined,
    selectedProvince: ProvinceListData | undefined,
    districts: ProvinceListDataDistricts[] | undefined,
    selectedDistrict: ProvinceListDataDistricts | undefined
    pharmacy_list: PharmacyListProps[] | [],
    filtered_pharmacies: DutyPharmacyResult[] | []
}


export interface PharmacyListProps {
    identifier: number,
    data: DutyPharmacyResult[]
}