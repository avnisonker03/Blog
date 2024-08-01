import React,{useId} from "react";


const Input=React.forwardRef(
    function Input({
        label,
        type="text",
        className="",
        error,
        ...props
    },ref){
        const id=useId()
        return (
            <div className="w-full">
                {label &&
                <label
                className="inline-block mb-1"
                htmlFor={id}
                //accessibility purpose ke lie use kia h
                ></label>}
                <input
                type={type}
                className={`
                px-6 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 text-lg w-full
                ${className}`}
                ref={ref}
                {...props}
                id={id}
                />
                {error && <p className="text-lg text-red-600 mb-2">{error.message}</p>}
            </div>
        )
    }
)




export default Input