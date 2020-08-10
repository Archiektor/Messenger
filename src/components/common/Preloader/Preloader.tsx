import preloader from "../../../assets/images/preloader.svg";
import React from "react";

const inlineStyle = {
    display: "block",
    width: "150px",
    height: "100px",
    margin: "0 auto",
}

export const Preloader: React.FC<{}> = () => {
    return (
        <img style={inlineStyle} src={preloader} alt="preloader"/>
    )
}

