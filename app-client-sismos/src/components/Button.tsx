
import BaseIcon from "./BaseIcon";

type props={
    color:string,
    type:'submit' | 'reset' | 'button',
    label:string;
    icon:string;
    onClick?: (e: React.MouseEvent) => void;
    href?:string
}

export function Button({color,type,label,icon,onClick}:props){
    return(
        <button className={`bg-${color}-800 hover:bg-${color}-200 text-white  rounded`} 
        type={type} onClick={onClick}>
            <BaseIcon path={icon}/>
        {label}
      </button>
    );
}