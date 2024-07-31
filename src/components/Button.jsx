import React from "react";

export default function Button({
    children,
    type="button",
    bgColor="bg-slate-800",
    textColor="text-white",
    className='',
    ...props
}){
    return(
        <button className={`px-2 py-2 text-white rounded font-semibold text-lg cursor-pointer hover:bg-slate-400 ${className} ${bgColor} ${textColor}`} {...props}>
          {children}
        </button>
    )
}
