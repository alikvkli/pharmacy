
import { useEffect, useState } from "react";
import PharmacyCard from "../components/pharmacy-card";
import { useAppSelector } from "../hooks";
import Layout from "../layouts";


export default function HomePage() {

    const { filtered_pharmacies, pharmacy_list, selectedProvince, selectedDistrict } = useAppSelector(state => state.app);
    const [allData, setAllData] = useState<any>([]);

    const handlePharmacyList = () => {
        const flat_data_list: any = [];
        pharmacy_list.forEach(item => {
            flat_data_list.push(...item.data);
        });
        setAllData(flat_data_list)
    }

    useEffect(() => {
        handlePharmacyList();
    }, [])


    return (
        <Layout>
            <div className="flex h-full flex-col items-center justify-center pt-4 gap-4 mb-5">
                {filtered_pharmacies?.length > 0 ? (
                    <>
                        {filtered_pharmacies.map(item => (
                            <PharmacyCard item={item} key={item.loc} />
                        ))}
                    </>
                ) : (
                    <>
                        {pharmacy_list?.length > 0 ? (
                            <>
                                {allData.map((item: any,key:number) => (
                                    <PharmacyCard item={item} key={key} />
                                ))}
                            </>
                        ) : (
                            <div>
                                Henüz bir arama gerçekleştirmediniz.
                            </div>
                        )}

                    </>
                )}
            </div>
        </Layout>
    )
}