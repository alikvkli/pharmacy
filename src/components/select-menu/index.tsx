import { FC, Fragment, useState } from "react";
import { SelectMenuProps } from "./types";
import { Combobox, Transition } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import classNames from "classnames";

const SelectMenu: FC<SelectMenuProps> = ({ disabled, placeHolder, items, value, setSelected }) => {
    const [query, setQuery] = useState<string>("");


    const filteredItems = query === '' ? items : items?.filter((item: any) => { return item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) })


    return (
        <Combobox disabled={disabled} value={value} onChange={(e: string) => setSelected(e)}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left border-[1px] border-zinc-200 shadow-sm focus:outline-none sm:text-sm">
                    <Combobox.Input
                        placeholder={placeHolder}
                        className={classNames("w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0", {
                            "cursor-not-allowed": disabled
                        })}
                        displayValue={(selected: string) => selected}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsChevronDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 d w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItems?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Aradığınız bulunamadı...
                            </div>
                        ) : (
                            filteredItems?.map((item: any) => (
                                <Combobox.Option
                                    key={item.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-[#e23c33] text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={item.name}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white bg-[#e23c33]' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default SelectMenu;