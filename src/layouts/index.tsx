import { FC, useEffect, useState } from "react";
import { LayoutProps } from "./types";
import { useAppDispatch, useAppSelector } from "../hooks";
import Logo from "../assets/logo.webp"
import { getDutyPharmacy, getProvinceList } from "../services";
import { _clearPharmacyList, _filteredPharmacyList, _setPharmacyList, _setProvices, _setSelectedDistrict, _setSelectedProvince } from "../features/app";
import SelectMenu from "../components/select-menu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: FC<LayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { appName, provinces, selectedProvince, districts, filtered_pharmacies, selectedDistrict, pharmacy_list } = useAppSelector(state => state.app);
    const [selectCounty, setSelectCounty] = useState<string>(selectedProvince?.name || "");
    const [selectDistrict, setSelectDistrict] = useState<string>(selectedDistrict?.name || "");

    useEffect(() => {
        if (provinces === undefined) {
            getProvinceList().then(res => dispatch(_setProvices(res.data)))
        }
    }, [dispatch, provinces])


    useEffect(() => {
        dispatch(_setSelectedProvince(selectCounty));
        setSelectDistrict("");
    }, [selectCounty])

    useEffect(() => {
        dispatch(_setSelectedDistrict(selectDistrict));
    }, [selectDistrict])

    useEffect(() => {
        if (selectedDistrict) {
            setSelectDistrict(selectedDistrict.name)
        } else {
            dispatch(_clearPharmacyList());
        }
    }, [selectedDistrict])

    const handleList = () => {
        if (selectedProvince && selectedDistrict) {
            const identifier = Number(`${selectedProvince.id}${selectedDistrict.id}`);
            if (pharmacy_list && pharmacy_list.length > 0 && pharmacy_list.findIndex(item => item.identifier === identifier) !== -1) {
                dispatch(_filteredPharmacyList(identifier))
                return;
            }

            getDutyPharmacy(selectedProvince.name, selectedDistrict.name).then(res => {
                if (res.success == true) {
                    dispatch(_setPharmacyList({ identifier: identifier, data: res.result }))
                }else {
                    //@ts-ignore
                    toast.error(res.result.error)
                    console.log(res)
                }
            })
        }
    }

    const handleClear = () => {
        setSelectDistrict("");
        setSelectCounty("");
        dispatch(_clearPharmacyList());
    }

    return (
        <div>
            <header className="sticky top-0 w-full h-16 bg-white border-b-[1px] border-zinc-200 shadow-sm flex items-center justify-between">
                <img className="w-auto h-full object-contain" src={Logo} alt={appName} />
                <div className="pr-4 flex gap-4">
                    <SelectMenu
                        placeHolder="İl giriniz"
                        items={provinces}
                        setSelected={setSelectCounty}
                        value={selectCounty}
                    />
                    <SelectMenu
                        disabled={!selectCounty}
                        placeHolder="İlçe giriniz"
                        items={districts}
                        setSelected={setSelectDistrict}
                        value={selectDistrict}
                    />
                    <button onClick={handleList} disabled={!selectedDistrict} className="bg-[#e23c33]/95 w-1/4 text-white px-4 py-1 text-sm rounded-md hover:bg-[#e23c33] disabled:bg-[#e23c33]/40 disabled:cursor-not-allowed">
                        Listele
                    </button>
                    {selectedProvince && selectedDistrict && filtered_pharmacies?.length > 0 && (
                        <button onClick={handleClear} className="bg-teal-500 w-1/4 text-white px-4 py-1 text-sm rounded-md hover:bg-teal-700">
                            Temizle
                        </button>
                    )}

                </div>
            </header>
            <ToastContainer/>
            {children}
        </div>
    )
}

export default Layout;