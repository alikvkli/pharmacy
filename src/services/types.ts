export interface DistrictListResponse {
    success: boolean,
    result: DistrictListResult[]
}

export interface DistrictListResult {
    text: string,
    pharmacy_number: string,
}

export interface DutyPharmacyResponse {
    success: boolean,
    result: DutyPharmacyResult[]
}

export interface DutyPharmacyResult {
    name: string,
    dist: string,
    address: string,
    phone: string,
    loc: string
}

export interface ProvinceListResponse{
    status: string,
    data: ProvinceListData[]
}

export interface ProvinceListData{
    id: number,
    name: string,
    area: number,
    population: number,
    altitude:number,
    areaCode: number[],
    isMetropolitan: boolean,
    coordinates:{
        latitude: number,
        longitude: number
    },
    maps: {
        googleMaps: string,
        openStreetMap: string
    },
    region: {
        en: string,
        tr: string
    },
    districts: ProvinceListDataDistricts[]
}

export interface ProvinceListDataDistricts{
    id: number,
    name: string,
    area: string,
    population: string,
}

