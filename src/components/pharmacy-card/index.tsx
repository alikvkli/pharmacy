import { FC } from "react";
import { PharmacyCardProps } from "./types";
import { FaLocationDot } from "react-icons/fa6"
import { BsFillTelephoneFill } from "react-icons/bs"
import Logo from "../../assets/ecz.png"

const PharmacyCard: FC<PharmacyCardProps> = ({ item }) => {
    return (
        <div className="bg-white p-4 w-1/2 shadow-md rounded-md flex flex-col items-start justify-start gap-2">
            <p className="flex w-full pb-2 gap-2 items-center border-b-[1px] border-zinc-200">
                <img className="w-auto h-6 object-contain" src={Logo} alt={item.name} />
                <span className="text-xl font-regular text-[#e23c33]">{item.name} {item.name.includes("Eczanesi") ? null : "Eczanesi" }</span>
            </p>
            <p className="flex gap-2 items-center">
                <BsFillTelephoneFill />
                {item.phone}
            </p>
            <p className="flex gap-2 items-center">
                <FaLocationDot />
                {item.address}
            </p>
        </div>
    )
}

export default PharmacyCard;