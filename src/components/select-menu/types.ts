export interface SelectMenuProps {
    value: string;
    setSelected: (item: string) => void;
    items: any;
    placeHolder:string;
    disabled?:boolean;
}