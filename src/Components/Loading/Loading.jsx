import Spinner from "react-spinner-material";
import style from "./Loading.module.css"
import React from "react";

function LoadingSpinner(){
    return(
        <>
     <div className={style.spinner}>
      <Spinner size={40} color={"#333"} width={3} visible={true} />
     </div>
        </>
    )
}

export default LoadingSpinner;