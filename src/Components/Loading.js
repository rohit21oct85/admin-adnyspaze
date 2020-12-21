import React from "react";
import {FaSpinner}  from "react-icons/fa"


 const Loading = ()=>{

    return(
        <div className="loader">
                <FaSpinner className="load-icon"/>
        </div>
    )

}
export default  Loading