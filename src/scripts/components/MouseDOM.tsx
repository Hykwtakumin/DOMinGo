import * as React from "react";
import {css} from 'emotion'

// interface defaultProps {
//     defaultState: defaultState
// }
//
// interface defaultState {
//     mdLeft : number,
//     mdTop : number,
//     mdWidth : number,
//     mdHeight : number
// }

export const MouseDOM = (props) => {
    const {mdLeft, mdRight, mdTop, mdBottom, mdWidth, mdHeight} = props;

    const mouseDom = css({
        margin: 0,
        position: "fixed",
        // backGround: "repeating-linear-gradient(45deg, #1e9cef, #1e9cef 5px, #FFFFFF 0, #FFFFFF 10px)",
        background: "#1e9cef",
        opacity: 0.5,
        left: mdLeft,
        right: mdRight,
        top: mdTop,
        bottom: mdBottom,
        width: mdWidth,
        height: mdHeight,
        zIndex: 114510,
    });

    return <div className={mouseDom}/>;
};