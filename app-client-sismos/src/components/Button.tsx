
import BaseIcon from "./BaseIcon";

type props={
    color:string,
    type:'submit' | 'reset' | 'button',
    label:string;
    icon:string;
    onClick?: (e: React.MouseEvent) => void;
    href?:string
    disabled?:boolean
}

export function Button({color,type,label,icon,onClick,disabled = false}:props){
    return(
        <button className={`bg-${color}-800 hover:bg-${color}-200 text-white  rounded`} 
        type={type} onClick={onClick} disabled={disabled}>
            <BaseIcon path={icon}/>
        {label}
      </button>
    );
}