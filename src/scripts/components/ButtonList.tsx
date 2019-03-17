import * as React from "react";
import {useState} from "react";
import {jsx, css} from '@emotion/core'
import {ActionPair, DOMinGoAction, reservedDOM, targetType} from "../libs/DOMinGOTypes";
import {
    domingoBold,
    domingoChangeBGColor,
    domingoEnlarge,
    domingoHide,
    domingoWidenLine
} from "../libs/defaultActionList";


// const buttonHover = css({
//     margin: "1%",
//     background: "#44bb89",
//     color: "#FFFFFF"
// });
//
// const button = css({
//     display: "block",
//     padding: "0.3em 1em",
//     textDecoration: "none",
//     background: "#FFFFFF",
//     color: "#44bb89",
//     border: "solid 3px #44bb89",
//     margin: "1%",
//     borderRadius: "3px",
//     transition: ".4s",
//     ':hover,:focus': buttonHover
// });

// actionList: DOMinGoAction[], reservedActionList: reservedDOM[]

export const ButtonList: React.FC<{}> = ({}) => {
    const [actionList, setActionList] = useState([domingoHide, domingoEnlarge, domingoBold, domingoWidenLine, domingoChangeBGColor]);
    const [reservedActionList, setReservedActionList] = useState([]);

    //useEffect(() =>{}, []);

    const handleClick = (action: DOMinGoAction) => {
        reservedActionList.map((dom: reservedDOM) => {
            if (dom.type === targetType.selector) {
                const elm = document.querySelector(dom.target) as HTMLElement;
                elm.classList.add(action.class);
                elm.style.cssText = action.style;
            } else if (dom.type === targetType.cssClass) {
                const elms = document.querySelectorAll(dom.target);
                if (elms) {
                    elms.forEach((elm: HTMLElement) => {
                        elm.classList.add(action.class);
                        elm.style.cssText = action.style;
                    });
                }
            }
        });
        //clear reservedActionList
        setReservedActionList([]);
    };

    return (
        <div>
            {actionList.map(action => {
                <button className={"domingo-action-button"} value={action.desc} onClick={() => {
                    handleClick(action)
                }}/>
            })}
        </div>
    );
};